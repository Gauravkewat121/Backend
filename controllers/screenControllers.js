const { Screens, Theaters } = require('../models');
const { message } = require('../validation/paymentValidation');

exports.addScreens = async (req, res) => {

    try {
        const { theater_id } = req.params;
        const theater = await Theaters.findOne({ where: { theater_id, isDeleted: 0 } });
        
        if(!theater){
            return res.status(404).send({message: "Theater not found"});
        }
        const added_screen = await Screens.findAll({where: {theater_id,isDeleted: false}});
        
        if( added_screen.some(screen=> screen.screen_no == req.body.screen_no) ){
            res.status(201).send({message: "Screen already exists!"});
        }
        else if (theater.owner_id == req.user.user_id || req.user.role == 'admin') {
            let screen = await Screens.create({ ...req.body, theater_id });

            res.status(200).send({ message: "Screen add successfully", screen });
        }
       
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}


exports.updateScreens = async (req, res) => {
    
    try {
        const { screen_id } = req.params;
        let scn = await Screens.findOne({ where: { screen_id, isDeleted: 0 } });
        console.log(scn);

 const screen = await sequelize.query(
            `
            Select sc.screen_id,screen_no,total_seats,screen_type
            from Screen as sc
            join Theaters as th on sc.screen_id = th.screen_id 
            where th.owner_id = :id and sc.screen_id = :screen_id;
            `,
                {
                    replacements: {screen_id,id:req.user.user_id},
                    type: Sequelize.QueryTypes.SELECT
                }
            );
const added_screen = await Screens.findAll({where: {screen_id,isDeleted: false}});
        
console.log(screen);
        if ( !scn ){
            res.status(404).send({message: "Screen not found"});
        }
        else if ( screen.length ) { 
            if( added_screen.some(screen=> screen.screen_no == req.body.screen_no) ){
               return res.status(201).send({message: "screen_no must be unique!"});
            }else{
                await scn.update(req.body);
                res.status(200).send({ message: "screen data updated successfully", screen });
            }
        }
        else {
            res.status(404).send({ message: 'not permitted' });
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }

}

exports.deleteScreen = async (req, res) => {

    try {

        const {screen_id} =req.params;

        if (req.user.role == 'user') {
            return res.status(401).send({message: 'you are not permitted'});
        }
        let scn = await Screens.findOne({ where: { screen_id, isDeleted: 0 } });
        if(!scn){
            return res.status(404).send({message: 'Screen not found'});
        }
        const screens = await sequelize.query(
            `
            Select sc.screen_id,screen_no,total_seats,screen_type
            from Screen as sc
            join Theaters as th on sc.screen_id = th.screen_id 
            where th.owner_id = :id and sc.screen_id = :screen_id;
            `,
                {
                    replacements: {screen_id,id:req.user.user_id},
                    type: Sequelize.QueryTypes.SELECT
                }
            );
        if(screens.length || req.user.role == 'admin') {
            await scn.update({isDeleted:true,deletedAt:Date.now()});
            res.status(200).json({msg:"screen Deleted  successfully !!"})
        } 
        else{
            res.status(403).json({msg:"not permitted!"});
        }

    } catch (err) {
        res.status(500).send({message: err.message});
    }
}



