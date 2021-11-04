import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Alert from "@mui/material/Alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { useRouter } from 'next/router';

import Link from "next/link";
import TextFieldComp from "./components/TextFieldComp";

const Login = ({ data }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [modalText, setModalText] = useState({
    status: "",
    text: "",
  });
  const [isLoginSuccess, setIsLoginSuccess] = useState();

  const formField = [
    {
      label: "Username",
      type: "text",
      icon: <AccountCircle sx={{ mr: 1, my: 0.5, color: blue[600] }} />
    },
    {
      label: "Password",
      type: "password",
      icon: <LockIcon sx={{ mr: 1, my: 0.5, color: blue[600] }} />
    }
  ]

  const handleClose = () => {
    setOpen(false);
    if (isLoginSuccess == "success") {
      router.push({
        pathname: "/containers/Dashboard"
      }, "dashboard", { shallow: true });
    }
  };

  const sendData = async (statement) => {
    try {
      const resp = await axios.post("http://localhost:3000/users/", statement);
      console.log(resp.data);
      setOpen(true);
      setModalText(resp.data);
      setIsLoginSuccess(resp.data.status);
    } catch (err) {
      console.log(err);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = e.currentTarget;

    const formData = {
      username: data.get("Username"),
      password: data.get("Password")
    }

    form.reportValidity() ?
      sendData(formData)
      :
      setAlert(true);
    ;
  }

  return (
    <Box sx={{ margin: isMobile ? "100px 0px" : "100px" }}>
      <Box>
        <Card sx={{ width: isMobile ? 350 : 420, margin: "0 auto" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", bgcolor: blue[500] }}>
            <Avatar sx={{ m: 2, bgcolor: blue[600] }}>
              <AccountCircle />
            </Avatar>
            <Typography sx={{ color: "white" }} component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          <CardContent component="form" onSubmit={handleSubmit} noValidate sx={{ padding: "15px 45px" }}>
            {alert ?
              <Alert severity="error">
                Misiing some input field
              </Alert>
              :
              ""}
            {TextFieldComp(formField)}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "30px" }}>
              <Button type="submit" variant="contained">Login</Button>
            </Box>
          </CardContent>
          <Link href="/containers/CreateAccount" as="CreateAccount">
            <Typography sx={{ textAlign: "center", m: 1, color: "blue", cursor: "pointer" }}>
              Create An Account..!
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
  )
}

export const getStaticProps = async (req, res) => {
  return {
    props: {
      data,
    },
  };
};

export default Login;