const { Users } = require("../models");
const bcrypt = require("bcrypt");
const redisClient = require('../config/redis');
const { generateToken } = require("../utils/jwt");

exports.signUp = async (req, res) => {
    try {
        const { name, email, phone, role,password, dateOfBirth } = req.body;
        let user = await Users.findOne({ where: { email, isDeleted: false } });
        if (user) {
            return res.status(409).json({ message: "Email already Exists" });
        }
        const haspass = await bcrypt.hash(password, 10);

        user = await Users.create({
            name,
            email,
            phone,
            role,
            password: haspass,
            dateOfBirth,
        });
        return res.status(400).json({ message: `${user.role} registered successfully` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email, isDeleted: 0 }, raw: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const is_match = await bcrypt.compare(password, user.password);

        if (!is_match) {
            return res.status(404).json({ message: "password incorrect" });
        }

        const token = generateToken({ id: user.user_id });
        console.log(user);
        const { isDeleted, deletedAt, updatedAt, ...userr } = user;
        res.status(200).json({ token, user: userr });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        const cachedUser = await redisClient.get(`user-${id}`);
        if(cachedUser){
            console.log("Data from Redis");
            return res.status(200).json(JSON.parse(cachedUser));
        }
        const user = await Users.findOne({
            where: { user_id: id, isDeleted: false },
            attributes: { exclude: ["password", "isDeleted", "deletedAt"] },
        });
        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        else{
            await redisClient.setEx(`user-${id}`,60*2,JSON.stringify(user));
            res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.userUpdate = async (req, res) => {
    try {
        const id = req.user.user_id;
        const user = await Users.findOne({
            where: { user_id: id, isDeleted: false }
        });
        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            await user.update(req.body);
            res.status(200).send('profile update successfully');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

