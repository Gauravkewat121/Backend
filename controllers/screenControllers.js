const { Screens, Theaters } = require('../models');

exports.addScreens = async (req, res) => {

    try {
        const { theater_id } = req.query;
        const theater = await Theaters.findOne({ where: { theater_id, isDeleted: 0 } });

        if (theater && (theater.owner_id == req.user.user_id || req.user.role == 'admin')) {
            let screen = await Screens.create({ ...req.body, theater_id });

            res.status(200).send({ message: "Screen add successfully", screen });
        }
        else {
            res.status(404).send({ message: 'Theater not found' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }


}

exports.updateScreens = async (req, res) => {

    try {
        const { theater_id } = req.query;
        const { screen_id } = req.params;
        let screen = await Screens.findOne({ where: { screen_id, theater_id, isDeleted: 0 } });

        if (screen && (req.user.role == 'admin' || await Theaters.findOne({ where: { theater_id, owner_id: req.user.user_id } }))) {

            await screen.update(req.body);
            res.status(200).send({ message: "screen data updated successfully", screen });

        }
        else {
            res.status(404).send({ message: 'Theater not found' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}