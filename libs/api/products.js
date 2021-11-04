const express = require("express");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const authenticateJWT = require("../jwt/authenticateJWT");

const Products = require("../models/Products");

router.post("/", authenticateJWT, async (req, res) => {
    const { productName, productPrice, productTotal, description } = req.body;

    try {
        let products = await Products.findOne({ productName });

        if (products) {
            return res.json(
                {
                    status: "failed",
                    text: "Products already exists..!"
                }
            );
        }
        products = new Products({
            id: uuidv4(),
            productName,
            productPrice,
            productTotal,
            description
        });

        await products.save();

        return res.json({
            status: "success",
            text: "Account successfully created.!"
        });
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Failed to create products"
            }
        );
    }
});

router.get("/getallproducts", authenticateJWT, async (req, res) => {
    try {
        let products = await Products.find().select("-_id -__v");

        if (!products) {
            return res.json(
                {
                    status: "failed",
                    text: "Products already exists..!"
                }
            );
        }
        return res.json(products);
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Failed to create products"
            }
        );
    }
});

router.get("/deleteproducts/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        let products = await Products.findOneAndDelete({ id });

        if (products) {
            return res.json(
                {
                    status: "success",
                    text: "Products has been deleted..!"
                }
            );
        }
        return res.json(
            {
                status: "failed",
                text: "Failed to delete products"
            }
        );
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Failed to delete products"
            }
        );
    }
});

router.post("/editproducts/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { productName, productPrice, productTotal, description } = req.body;

    try {
        const updateProducts = {
            id,
            productName,
            productPrice,
            productTotal,
            description
        };
        let products = await Products.updateOne(
            { id },
            { ...updateProducts }
        );

        if (!products) {
            return res.json(
                {
                    status: "failed",
                    text: "Failed to update products"
                }
            );
        }
        return res.json(
            {
                status: "success",
                text: "Success to update products"
            }
        );
    } catch (err) {
        console.log(err);
        return res.json(
            {
                status: "failed",
                text: "Failed to update products"
            }
        );
    }


});

module.exports = router;