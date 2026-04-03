
const { Movies, Theaters, MovieTheaters, Screens } = require('../models');

const redisClient = require('../config/redis');
const sequelize = require('../config/db');
const { Sequelize, } = require('sequelize');
const moment = require('moment-timezone');

exports.addMovieIntoTheater = async (req, res) => {
    try {
        const { movie_id, theater_id, screen_id, start_time } = req.body;
        let theater = await Theaters.findOne({ where: { isDeleted: 0, theater_id } });
        const screen = theater && await Screens.findOne({ where: { screen_id, isDeleted: false } });

        if (!screen) {
            let message = theater ? 'Screen is not found' : 'Theater is not found';
            res.status(404).send({ message });
        } else {
            const movie = await Movies.findOne({ where: { isDeleted: 0, movie_id } });

            if (!movie) {
                res.status(404).send({ message: 'Movie is not found' });
            } else {

                const shows = await sequelize.query(`

                    with 
	                    shows as (
                            select MT_id as id ,movie_id ,theater_id ,screen_id,start_time
                            from MovieTheaters
                            where theater_id= :theater_id and isDeleted =0
                        )
                            select  id ,s.movie_id,theater_id,screen_id,start_time,m.duration_time
                            from shows as s
                            join Movies as m 
                            on s.movie_id = m.movie_id
                            where Date(s.start_time) = Date(:start_time) 
                            and s.screen_id = :screen_id and m.isDeleted=0;
                        
                    `,
                    {
                        replacements: { start_time, screen_id, theater_id },
                        type: Sequelize.QueryTypes.SELECT
                    }
                )

                const isValid = shows.some(show => {

                    let show_start = moment.tz(show.start_time, 'Asia/Kolkata');
                    let show_end = show_start.clone().add(show.duration_time, 'minutes');

                    // new movie 
                    let movie_start = moment.tz(start_time, 'Asia/Kolkata');
                    let movie_end = movie_start.clone().add(movie.duration_time, 'minutes');

                    function timeValue(d) {

                        return d.hours() * 60 + d.minutes() + d.seconds();
                    }

                    let open = moment.tz(theater.opening_time, "HH:mm", "Asia/Kolkata");
                    let close = moment.tz(theater.closing_time, "HH:mm", "Asia/Kolkata");

                    return (
                        (timeValue(open) < timeValue(movie_start) && movie_end.isSameOrBefore(show_start))
                        ||
                        (show_end.isSameOrBefore(movie_start) && timeValue(movie_end) < timeValue(close))
                    )
                });

                if (!isValid) {
                    res.status(203).send({ message: 'These Show-time is occupied, Enter valid time!' });
                }
                else if (req.user.role == 'admin' || req.user.user_id == theater.owner_id) {
                    let show = await MovieTheaters.create(req.body);
                    res.status(200).send({ message: 'movie successfully added into the theater ', show });
                } else {
                    res.status(401).send({ message: 'You are not authorized' });
                }
            }
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateMovieIntoTheater = async (req, res) => {
    try {

        const { MT_id } = req.params;
        const { movie_id, theater_id } = req.body;

        const theater_movie = await MovieTheaters.findOne({ where: { isDeleted: 0, MT_id } });

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

        const { MT_id } = req.params;

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

        if (cacheMovies) {
            console.log('Data from Redis');
            return res.status(200).json(JSON.parse(cacheMovies));
        }

        const theater_movies = await MovieTheaters.findOne({ where: { isDeleted: 0, movie_id, theater_id } });
        if (theater_movies) {
            await redisClient.setEx(`${theater_id}-${movie_id}`, 60 * 2, JSON.stringify(theater_movies));
            res.status(200).send(theater_movies);
        } else {
            res.status(404).send('Resource not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}


exports.getMoviesOfTheater = async (req, res) => {

    try {
        const { theater_id } = req.params;

        const cacheMovies = await redisClient.get(`MOVIES-${theater_id}`);

        if (cacheMovies) {
            console.log('Data from Redis');
            return res.status(200).json(JSON.parse(cacheMovies));
        }

        const theater_movies = await MovieTheaters.findAll({ where: { isDeleted: 0, theater_id } });
        if (theater_movies.length != 0) {
            await redisClient.setEx(`MOVIES-${theater_id}`, 60 * 2, JSON.stringify(theater_movies));
            res.status(200).send(theater_movies);
        } else {
            res.status(404).send('Theater not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}