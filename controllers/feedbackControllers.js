const { Feedbacks } = require('../models');


exports.createFeedback = async (req, res) => {
    try {
        const {movie_id} = req.params;
        
    const feedback = await Feedbacks.create({user_id:req.user.user_id, movie_id,...req.body});
        res.status(200).json({ message: 'thanks for rating' });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteFeedback = async (req, res) => {
    try {
        const {feedback_id} = req.params;
        
        const feedback = await Feedbacks.findOne({where:{feedback_id}});
        if( feedback && req.user.role == 'admin'){
            await feedback.update({isDeleted: 1,deletedAt: new Date()})
            res.status(200).json({ message: 'Deleted successfully' });
        }
        else{
            res.status(201).send('you are not permitted');
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}