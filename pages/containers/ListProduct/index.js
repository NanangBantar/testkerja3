import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import TableComp from "../../components/TableComp";
import { useRouter } from 'next/router'

const ListProduct = () => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [alert, setAlert] = useState({
        status: "",
        text: ""
    });
    const [filter, setFilter] = useState("");


    const getAllProducts = async () => {
        try {
            const resp = await axios.get("http://localhost:3000/products/getallproducts");
            setRows(resp.data);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProducts = async (statement) => {
        try {
            const resp = await axios.get(`http://localhost:3000/products/deleteproducts/${statement}`);
            setAlert({
                status: resp.data.status,
                text: resp.data.text
            });
            console.log(resp.data);
            getAllProducts();
        } catch (err) {
            console.log(err);
        }
    }

    const editProducts = async (e, statement) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const form = e.currentTarget;

        const formData = {
            productName: data.get("Name"),
            productPrice: data.get("Price"),
            productTotal: data.get("Total Product"),
            description: data.get("Description")
        }
        try {
            const resp = await axios.post(`http://localhost:3000/products/editproducts/${statement}`, formData);
            setAlert({
                status: resp.data.status,
                text: resp.data.text
            });
            getAllProducts();
        } catch (err) {
            console.log(err);
        }
    }

    const saleProducts = (statement) => {
        console.log(statement);
        const win = window.open(`/containers/Sales/${statement}`, "_blank");
        win.focus();
    }

    const RowTitle = ["Product Name", "Price", "Product Total", "Descripton", "Action"];

    useEffect(() => {
        getAllProducts();
    }, [filter]);

    return (
        <>
            <Alert sx={{ marginBottom: "10px" }} severity={alert.status === "" ? "info" : alert.text === "success" ? "error" : "success"}>
                {alert.text === "" ? <div>Action Info</div> : alert.text}
            </Alert>
            <TextField
                required
                id="outlined-required"
                label="Search Products"
                sx={{ width: "100%" }}
                onChange={(e) => setFilter(e.currentTarget.value)}
            />
            <TableComp RowData={rows.filter(val => val.productName.toUpperCase().includes(filter.toUpperCase()))} DeleteAction={deleteProducts} RowTitle={RowTitle} EditAction={editProducts} SaleProducts={saleProducts} />
        </>
    );
}

export const getStaticProps = async (req, res) => {
    return {
        props: {
            data,
        },
    };
};

export default ListProduct;