import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";

const Dashboad = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [currentUser, setCurrentUser] = useState();

    const getCurrentUser = async () => {
        try {
            const resp = await axios.get("http://localhost:3000/users/getuser");
            setCurrentUser(resp.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <Box container sx={{ display: "flex", flexDirection: isMobile ? "column" : "" }}>
            <Grid xs={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} container item columns={{ xs: 4, sm: 8, md: 12 }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={currentUser?.username}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={currentUser?.gender === "male" ? "https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation.png" : "https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation.png"}
                        alt="Paella dish"
                    />
                    <Typography sx={{ margin:"10px" }}>
                        {currentUser?.email}
                    </Typography>
                </Card>
            </Grid>
            <Grid xs={8} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} container item columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Box sx={{ margin: "10px" }}>
                            <Card>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
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

export default Dashboad;