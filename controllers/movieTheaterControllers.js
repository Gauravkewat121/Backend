
const { Movies, Theaters, MovieTheaters } = require('../models');
const redisClient = require('../config/redis');
const { Json } = require('sequelize/lib/utils');

exports.addMovieIntoTheater = async (req, res) => {

    try {

        const { movie_id, theater_id } = req.body;

        const movie = await Movies.findOne({ where: { isDeleted: 0, movie_id } });

        if (!movie) {
            res.status(404).send('Movie is not found');
        } else {
            let theater = await Theaters.findOne({ where: { isDeleted: 0, theater_id } });

            if (!theater) {
                res.status(404).send('Theater is not found');
            } else {

                if (req.user.role == 'admin' || req.user.user_id == theater.owner_id) {
                    let theater_movie = await MovieTheaters.create(req.body);
                    res.status(200).send({ message: 'movie successfully added into the theater ', theater_movie });
                } else {
                    res.status(403).send('you are not permitted');
                }
            }
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateMovieIntoTheater = async (req, res) => {
    try {

        const { MT_id } = req.params;
        const { movie_id, theater_id } = req.body;

        const theater_movie = await MovieTheaters.findOne({ where: { isDeleted: 0, MT_id} });

        if (!theater_movie) {
            res.status(404).send('Resource not found');
        } else {
            let theater = await Theaters.findOne({ where: { isDeleted: 0, theater_id } });

            if (!theater) {
                res.status(404).send('Theater is not found');
            } else {

                if (req.user.role == 'admin' || req.user.user_id == theater.owner_id) {

                    await theater_movie.update(req.body);
                    res.status(200).send({ message: 'updated Successfully', updated_data: theater_movie });
                } else {
                    res.status(403).send('you are not permitted');
                }
            }
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.deleteMovieIntoTheater = async (req, res) => {
    try {

        const { MT_id } = req.body;

        const theater_movie = await MovieTheaters.findOne({ where: { isDeleted: 0, MT_id } });
        if (!theater_movie) {
            res.status(404).send('Resource not found');
        } else {

            const theater = await Theaters.findOne({ where: { isDeleted: 0, theater_id: theater_movie.theater_id } });
            if (req.user.role == 'admin' || (theater && req.user.user_id == theater.owner_id)) {

                await theater_movie.update({ isDeleted: 1 });
                res.status(200).send({ message: 'Deleted Successfully', theater_movie });
            } else {
                res.status(403).send('you are not permitted');
            }
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

}

exports.getMovieOfTheater = async (req, res) => {

    try {
        const { movie_id, theater_id } = req.params;

        const cacheMovies = await redisClient.get(`${theater_id}-${movie_id}`);

        if(cacheMovies) {
            console.log('Data from Redis');
            return res.status(200).json(JSON.parse(cacheMovies));
        }

        const theater_movies = await MovieTheaters.findAll({ where: { isDeleted: 0, movie_id, theater_id } });
        if(theater_movies.length != 0) {
            await redisClient.setEx(`${theater_id}-${movie_id}`,60*2,JSON.stringify(theater_movies));
        }
        res.status(200).send(theater_movies);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


exports.getMoviesOfTheater = async (req, res) => {

    try {
        const { theater_id } = req.params;

        const cacheMovies = await redisClient.get(`MOVIES-${theater_id}`);

        if(cacheMovies) {
            console.log('Data from Redis');
            return res.status(200).json(JSON.parse(cacheMovies));
        }

        const theater_movies = await MovieTheaters.findAll({ where: { isDeleted: 0, theater_id } });
        if(theater_movies.length != 0) {
            await redisClient.setEx(`MOVIES-${theater_id}`,60*2,JSON.stringify(theater_movies));
        }
        res.status(200).send(theater_movies);
    } catch (err) {
        res.status(500).send(err.message);
    }
}