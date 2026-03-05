const { Feedbacks } = require('../models');


exports.createFeedback = async (req, res) => {
    try {
        const feedback = await Feedbacks.create(req.user.user_id, ...req.body);
        res.status(200).json({ message: 'thanks for rating' });
    } catch (error) {
        res.status(500).json(error.message)
    }
}