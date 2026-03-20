const { Movies } = require("../models");

const redisClient = require('../config/redis');

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
        if (req.user.role != "admin") {

            res.status(403).json({ msg: "NOT authorized !!" });
        }
        else {

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

            res.status(200).json({ movie, msg: "movie update succesfully !!" });
        }
    } catch (error) {
        res.status(500).send(error)
    }
};


exports.getMovie = async (req, res) => {
    try {
        const { movie_id } = req.params;

        const cachedMovie = await redisClient.get(`movie-${movie_id}`);

        if (cachedMovie) {
            console.log('Data from Redis');
            return  res.json(JSON.parse(cachedMovie));
        }
        const movie = await Movies.findOne({ where: { movie_id, isDeleted: false }, attributes: { exclude: ['isDeleted', 'deletedAt', 'createdAt', 'updatedAt'] } });
        if (!movie) res.status(404).json({ msg: "movie not found !!" })
        else {
            await redisClient.setEx(`movie-${movie_id}`,60*2,JSON.stringify(movie));
            res.status(200).json(movie)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        let pageno = parseInt(req.query.pageno) || 1;

        const limit = parseInt(req.query.limit) || 10;

        const offset = (pageno - 1) * limit;

        const cachedMovies = await redisClient.get(`movies-${pageno}-${limit}`);

        if (cachedMovies) {
            console.log('Data from Redis');
            return res.json(JSON.parse(cachedMovies));
        }

        const movies = await Movies.findAll({ order: [['createdAt', 'DESC']], where: { isDeleted: false }, limit, offset ,attributes:{ exclude: ['isDeleted','deletedAt']}})

        const count = await Movies.count({ where: { isDeleted: false } });

        const totalPages = Math.ceil(count / limit);

        await redisClient.setEx(`movies-${pageno}-${limit}`, 60 * 3, JSON.stringify({ currentPage: pageno, limit ,totalPages, movies }));

        res.status(200).json({ currentPage: pageno, totalPages, movies });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
