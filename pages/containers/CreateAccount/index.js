import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Alert from "@mui/material/Alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

import TextFieldComp from '../../components/TextFieldComp';
import Link from "next/link";

export default function CreateAccount() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState({
        status:"",
        text:"",
    });

    const formField = [
        {
            label: "Username",
            type: "text",
            icon: <AccountCircle sx={{ mr: 1, my: 0.5, color: blue[600] }} />,
            value:""
        },
        {
            label: "Email",
            type: "email",
            icon: <AlternateEmailIcon sx={{ mr: 1, my: 0.5, color: blue[600] }} />,
            value:""
        },
        {
            label: "Gender",
            type: "radio",
            icon: <SupervisedUserCircleIcon sx={{ mr: 1, my: 0.5, color: blue[600] }} />,
            category: ["Female", "Male"],
            value: ["female", "male"]
        },
        {
            label: "Password",
            type: "password",
            icon: <LockIcon sx={{ mr: 1, my: 0.5, color: blue[600] }} />,
            value:""
        }
    ]

    const handleClose = () => {
        setOpen(false);
    };

    const sendData = async (statement) => {
        try {
            const resp = await axios.post("http://localhost:3000/users/createAccount/", statement);
            console.log(resp.data);
            setOpen(true);
            setModalText(resp.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const form = e.currentTarget;

        const dataForm = {
            username: data.get("Username"),
            email: data.get("Email"),
            gender: data.get("Gender"),
            password: data.get("Password")
        }

        form.reportValidity() ?
            sendData(dataForm)
            :
            setAlert(true)
    }

    return (
        <Box sx={{ margin: isMobile ? "100px 0px" : "80px" }}>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <Card sx={{ width: isMobile ? 350 : 420, margin: "0 auto" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", bgcolor: blue[500] }}>
                        <Avatar sx={{ m: 2, bgcolor: blue[600] }}>
                            <AccountCircle />
                        </Avatar>
                        <Typography sx={{ color: "white" }} component="h1" variant="h5">
                            Create An Account
                        </Typography>
                    </Box>
                    <CardContent sx={{ padding: "15px 45px" }}>
                        {alert ?
                            <Alert sx={{ margin: "0 0 10px 0" }} severity="error">
                                Misiing some input field
                            </Alert>
                            :
                            ""}
                        {TextFieldComp(formField)}
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "30px" }}>
                            <Button type="submit" variant="contained">Create Account</Button>
                        </Box>
                    </CardContent>
                    <Link href="/">
                        <Typography sx={{ textAlign: "center", m: 1, color: "blue", cursor: "pointer" }}>
                            Already Have An Account..!
                        </Typography>
                    </Link>
                </Card>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ color: modalText.status === "failed" ? "red" : "green" }} id="alert-dialog-title">
                    {modalText.status.toUpperCase()}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalText.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}