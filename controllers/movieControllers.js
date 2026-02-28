const { Movies } = require("../models");

exports.createMovie = async (req, res) => {
    try {
        if (req.user.role == "admin") {

            const movie = await Movies.create(req.body);
            res.status(200).json({ msg: "movie create succesfully !!", movie });
        } 
        else {
            res.status(403).json({ msg: "NOT authorized !!" });
        }

    } catch (error) {
        return res.status(500).send(error);
    }
};


exports.deleteMovie = async (req, res) => {
    try {

        const { movie_id } = req.params;
        if (req.user.role != "admin"){

            res.status(403).json({ msg: "NOT authorized !!" });
        }
        else{

            const movie = await Movies.findOne({ where: { movie_id, isDeleted: false } })
    
            if (!movie) return res.status(401).json({ msg: "movie not found !!" })
    
            await movie.update({ isDeleted: true, deletedAt: Date.now() });
    
            res.status(200).json({ msg: "movie create succesfully !!" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};


exports.updateMovie = async (req, res) => {
    try {
        const { movie_id } = req.params;
        if (req.user.role != "admin") {

            res.status(403).json({ msg: "NOT authorized !!" });
        } else {

            const movie = await Movies.findOne({ where: { movie_id, isDeleted: false } })

            if (!movie) return res.status(401).json({ msg: "movie not found !!" })

            await movie.update(req.body);

            res.status(200).json({ movie,msg: "movie update succesfully !!" });
        }
    } catch (error) {
        res.status(500).send(error)
    }
};


exports.getMovie = async (req, res) => {
    try {
        const {movie_id} = req.params;
        const movie = await Movies.findOne({ where: { movie_id, isDeleted: false }, attributes: { exclude: ['isDeleted', 'deletedAt', 'createdAt', 'updatedAt'] } });
        if (!movie) res.status(404).json({ msg: "movie not found !!" })
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        let pageno = parseInt(req.query.pageno) || 1;

        const limit = parseInt(req.query.limit) || 10;

        const offset = (pageno - 1) * limit;
        
        const movies = await Movies.findAll({ order: [['createdAt', 'DESC']],where: { isDeleted: false }, limit, offset })

        const count = await Movies.count({ where: { isDeleted: false } });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({ movies, currentPage: pageno, totalPages });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
