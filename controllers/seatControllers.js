const { Theaters, Screens, Seats } = require("../models");

exports.createSeat = async (req, res) => {
  try {
    const { screen_id } = req.params;
    let { silver, gold, platinum, platinum_price, gold_price, silver_price } = req.body;

    if (req.user.role == "user") {
      return res.status(401).send({ message: "you are not permitted" });
    }
    
    const screen = await Screens.findOne({ where: { screen_id, isDeleted: false } });

    if (!screen) {
      return res.status(404).send({ message: "screen not found" });
    }

    platinum = parseInt(platinum);
    silver = parseInt(silver);
    gold = parseInt(gold);

    platinum_price = parseFloat(platinum_price);
    silver_price = parseFloat(silver_price);
    gold_price = parseFloat(gold_price);

    const added_seats = await Seats.findAll({ where: { screen_id, isDeleted: false } });

    let given_seats = silver + platinum + gold;
    let remaining_seats = screen.total_seats - added_seats.length;

    if (remaining_seats < given_seats) {
      return res.status(201).send({ message: 'seats has too much quantity!', remaining_seats, given_seats });
    }

    const vendor = await Theaters.findOne({ where: { theater_id: req.user.user_id, screen_id, isDeleted: false } });

    if (vendor || req.user.role == 'admin') {
      let data = [];
      let seat_type = "silver";
      let amount = silver_price;
      let seat = 'S';
      for (let i = 1; i <= given_seats; i++) {

        if (i > silver) {
          seat_type = "gold";
          amount = gold_price;
          seat = 'G'
        }
        if (i > gold + silver) {
          seat_type = "platinum";
          amount = platinum_price;
          seat = 'P';
        }
        data.push({
          seat_number: seat + i,
          screen_id: screen_id,
          seat_type: seat_type,
          price: amount,
        });
      }
      const seats = await Seats.bulkCreate(data);
      res.status(200).send({ message: "Seat created successfully!", seats });
    }
  }
  catch (err) {
    res.status(500).send({message: err.message});
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const { seat_id } = req.params;
    const seat = await Seats.findOne({
      where: { seat_id, isDeleted: 0 },
      raw: true,
    });

    if (!seat) {
      return res.status(404).send({message:"Resource not found"});
    }

    const screen_of_theater = await Screens.findOne({
      where: { screen_id: seat.screen_id, isDeleted: 0 },
      include: [
        {
          model: Theaters,
          as: "theater",
          attributes: ["owner_id"],
          where: {
            owner_id: req.user.user_id,
          },
        },
      ],
    });
    
    if (screen_of_theater || req.user.role == 'admin') {

      await Seats.update({ isDeleted: 1 }, { where: { seat_id } });
      res.status(200).json({ message: "deleted succesfully" });
    }else{
      res.status(409).json({ message: "not authorized" }); 
    }
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};
