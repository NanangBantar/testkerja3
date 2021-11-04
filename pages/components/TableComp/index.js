import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import TextFieldComp from '../../components/TextFieldComp';

export default function TableComp({ RowTitle, RowData, DeleteAction, EditAction, SaleProducts }) {
    const [open, setOpen] = useState(false);
    const [getId, setGetId] = useState("");
    const [formField, setFormField] = useState(
        [
            {
                label: "Name",
                type: "text",
                icon: "",
                value: ""
            },
            {
                label: "Price",
                type: "number",
                icon: "",
                value: ""
            },
            {
                label: "Total Product",
                type: "number",
                icon: "",
                value: ""
            },
            {
                label: "Description",
                type: "textarea",
                placeholder: "Description of product",
                row: 2,
                icon: "",
                value: ""
            }
        ]
    );

    const handleClickOpen = (statement) => {
        setOpen(true);
        const newFormField = RowData.filter(val => val.id === statement);
        setGetId(newFormField[0].id);
        setFormField([
            {
                label: "Name",
                type: "text",
                icon: "",
                value: newFormField[0].productName
            },
            {
                label: "Price",
                type: "number",
                icon: "",
                value: newFormField[0].productPrice
            },
            {
                label: "Total Product",
                type: "number",
                icon: "",
                value: newFormField[0].productTotal
            },
            {
                label: "Description",
                type: "textarea",
                placeholder: "Description of product",
                row: 2,
                icon: "",
                value: newFormField[0].description
            }
        ]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {RowTitle.map((_, index) =>
                                <TableCell key={index} sx={{ textAlign: "center" }}>{_}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RowData?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ textAlign: "center" }} component="th" scope="row">
                                    {row.productName}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{row.productPrice}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{row.productTotal}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{row.description}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button onClick={() => handleClickOpen(row.id)} sx={{ margin: 1 }} variant="outlined" color="success">
                                        EDIT
                                    </Button>
                                    <Button onClick={() => DeleteAction(row.id)} sx={{ margin: 1 }} variant="outlined" color="error">
                                        DELETE
                                    </Button>
                                    <Button onClick={() => SaleProducts(row.id)} sx={{ margin: 1 }} variant="outlined" color="primary">
                                        SALES
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                component="form"
                noValidate
                onSubmit={(e) => { EditAction(e, getId, handleClose()); }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    {TextFieldComp(formField)}
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="outlined" autoFocus>
                        Submit
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}