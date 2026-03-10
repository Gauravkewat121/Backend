const { Bookings, Payments } = require('../models');
const sequelize = require("../config/db");

async function is_seat_available(MT_id, seat_id) {
    const Booking = await Bookings.findOne({ where: { MT_id, seat_id, status: "booked", isDeleted: false } });
    return Booking;
}

async function processPayment(paymentDetails) {
    const delay = Math.random() * 2000 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const status = Math.random();
    console.log(status)
    if (status < 0.8) {
        return { success: true, status: 'completed' };
    } else if (status < 0.9) {
        return { success: false, status: 'failed' };
    } else {
        return { success: false, status: 'pending' };
    }
}


function generateTransactionId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);

    return `TXN-${timestamp}-${random}`;
}



async function createBookingAndProcessPayment(userId, MT_id, seat_id,total_amount, paymentDetails) {
    const transaction = await sequelize.transaction();
    
    try {
        const is_Seat = await is_seat_available(MT_id, seat_id);
        if (is_Seat) {
            throw new Error('Seat already Booked !!!!!');
        }
        
        const Booking = await Bookings.create({
            user_id: userId,
            MT_id,
            total_amount,
            seat_id,
            status: 'wait-list',
            booking_time: Date.now()
        });

        const transaction_id = generateTransactionId();

        const Payment = await Payments.create({
            booking_id: Booking.booking_id,
            amount: total_amount,
            payment_status: 'pending',
            payment_method: paymentDetails.payment_method,
            transaction_id: transaction_id
        }, { transaction });

        const paymentResult = await processPayment(paymentDetails);

        if (!paymentResult.success) {
            if (paymentResult.status === 'failed') {
                throw new Error('Payment failed');
            } else if (paymentResult.status === 'pending') {
                console.log('Payment is still pending, please try again later.');
                await Payment.update({ payment_status: 'pending' }, { transaction });
            }
        }

        await Payment.update({ payment_status: 'completed' }, { transaction });

        await Booking.update({ status: 'booked' }, { transaction });

        await transaction.commit();

        return { bookingId: Booking.booking_id, paymentStatus: Payment.payment_status };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}



exports.bookingAndPayment = async (req, res) => {
    const { MT_id, seat_id,total_amount, paymentDetails } = req.body;

    try {
        const result = await createBookingAndProcessPayment(req.user.user_id, MT_id, seat_id,total_amount, paymentDetails);
        console.log(result);
        res.status(200).json({
            bookingId: result.bookingId,
            paymentStatus: result.paymentStatus,
            message: "Booking confirmed!"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Booking failed."
        });
    }
}


exports.cancelBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;

        const Booking = await Bookings.findOne({ where: { booking_id, user_id: req.user.user_id, isDeleted: false } });

        if (!Booking){
            res.status(404).json({ msg: "booking not found !!!" });
        }else{
            await Booking.update({ status: 'cancelled' });

            // const booking = await Bookings.findOne({ 
            //     where : { status: 'wait-list',isDeleted: 0},
            //     order: [ 'booking_time','desc']
            // });

            // if(booking){
            //     await booking.update({status: 'booked'});
            // }
            res.status(200).json({ msg: "booking cancelled !!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}