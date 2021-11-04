const express = require('express')
const next = require('next');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const connectMongo = require("./libs/connection/connectMongo");

dotenv.config();

const dev = process.env.PORT !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const authenticateJWT = require("./libs/jwt/authenticateJWT");

app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json({
            extended: false
        }));
        connectMongo();

        server.use(cookieParser('token'));

        // api management users
        server.use("/users", require("./libs/api/users"));
        server.use("/products", require("./libs/api/products"));

        // view management 
        server.get("/CreateAccount", (req, res) => {
            return app.render(req, res, "/containers/CreateAccount");
        });

        server.get("/Dashboard", authenticateJWT, (req, res) => {
            return app.render(req, res, "/containers/Dashboard", req.user);
        });

        server.get("/", (req, res) => {
            return app.render(req, res, "/");
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        });
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })