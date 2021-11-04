const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const router = express.Router();
dotenv.config();
router.use(cookieParser('token'));
const authenticateJWT = require("../jwt/authenticateJWT");

const User = require("../models/Users");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.json(
                {
                    status: "failed",
                    text: "User doesnt exits..!"
                }
            );
        }

        let isMatch = await bcryptjs.compare(password, user.password);

        if (isMatch) {
            const payload = {
                username
            };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
            res.cookie('token', token, { signed: true, httpOnly: true });
            return res.json({
                status: "success",
                text: "Login Success..!"
            });
        } else {
            return res.json(
                {
                    status: "failed",
                    text: "Username or password is wrong"
                }
            );
        }
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Username or password is wrong"
            }
        );
    }
});

router.post("/createAccount", async (req, res) => {
    const { username, email, password, gender } = req.body;
    const passwordText = password;
    const salt = await bcryptjs.genSalt(10);

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.json(
                {
                    status: "failed",
                    text: "User Already exits..!"
                }
            );
        }

        user = new User({
            username,
            email,
            gender,
            password,
            passwordText,
        });

        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        return res.json({
            status: "success",
            text: "Account successfully created.!"
        });
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Failed to create account.!"
            }
        );
    }
});

router.get("/getuser", authenticateJWT, async (req, res) => {
    const { username } = req.user;
    try {
        let user = await User.findOne({ username }).select("-_id -__v");
        if (!user) {
            return res.json(
                {
                    status: "failed",
                    text: "User doesnt exits..!"
                }
            );
        }

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Failed to create account.!"
            }
        );
    }
});

module.exports = router;