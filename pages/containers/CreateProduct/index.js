import * as React from 'react';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from "axios";

import TextFieldComp from '../../components/TextFieldComp';

const CreateProduct = () => {
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState({
        severity: "",
        text: ""
    });

    const formField = [
        {
            label: "Name",
            type: "text",
            icon: "",
            value:""
        },
        {
            label: "Price",
            type: "number",
            icon: "",
            value:""
        },
        {
            label: "Total Product",
            type: "number",
            icon: "",
            value:""
        },
        {
            label: "Description",
            type: "textarea",
            placeholder: "Description of product",
            row: 2,
            icon: "",
            value:""
        }
    ]

    const sendData = async (statement) => {
        try {
            const resp = await axios.post("http://localhost:3000/products/", statement);
            setAlert(true);
            setAlertText({
                severity: resp.data.status === "failed" ? "error" : "success",
                text: resp.data.text
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const form = e.currentTarget;

        const formData = {
            productName: data.get("Name"),
            productPrice: data.get("Price"),
            productTotal: data.get("Total Product"),
            description: data.get("Description")
        }

        form.reportValidity() ?
            sendData(formData)
            :
            setAlert(true);
        setAlertText({
            severity: "error",
            text: "Missing some input field..!"
        });

        console.log("aaa");
    }

    return (
        <Card sx={{ padding: "10px" }}>
            <CardContent onSubmit={handleSubmit} component="form" noValidate>
                {alert ?
                    <Alert sx={{ marginBottom:"10px" }} severity={alertText.severity}>
                        {alertText.text}
                    </Alert>
                    :
                    ""}
                {TextFieldComp(formField)}
                <Button type="submit" sx={{ margin: "10px 0" }} variant="contained">Submit</Button>
            </CardContent>
        </Card>
    );
}

export const getStaticProps = async (req, res) => {
    return {
        props: {
            data,
        },
    };
};

export default CreateProduct;