const { Screens, Theaters } = require('../models');

exports.addScreens = async (req, res) => {

    try {
        const { theater_id } = req.params;
        const theater = await Theaters.findOne({ where: { theater_id, isDeleted: 0 } });

        if (theater && (theater.owner_id == req.user.user_id)) {
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
        const { screen_id } = req.params;
        console.log(screen_id,req.user.user_id)
        let screen = await Screens.findOne({ where: { screen_id, isDeleted: 0 },
            include : [
                {
                    model: Theaters,
                    as : 'theater',
                    attributes: ['owner_id'],
                    where: {
                        owner_id: req.user.user_id
                    }
                }
            ]
        });


        if (screen ) {

            await screen.update(req.body);
            res.status(200).send({ message: "screen data updated successfully", screen });
        }
        else {
            res.status(404).send({ message: 'Resource not found' });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}

exports.deleteScreen = async (req, res) => {

    try {

        const {screen_id} =req.params;

        if (req.user.role == 'user') {
            return res.status(401).send('you are not permitted');
        }
               

        let screeen =  await Screen.findOne({
            where:{screen_id,isDeleted:false},
            include:[
                {
                    model:Theaters,
                    as:'theater',
                    attributes:['owner_id'],
                    where:{
                        owner_id:req.user.user_id
                    }
                }
            ]
        })
        if(!screeen) {
            res.status(403).json({msg:"not authorized!!"});
        } 
        else{
            screeen=await screeen.update({isDeleted:true,deletedAt:Date.now()});
            res.status(200).json({msg:"screen Deleted  successfully !!"})
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}



