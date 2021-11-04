import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';

// containers import
import Dashboad from './Dashboard';
import CreateProduct from '../CreateProduct';
import ListProduct from '../ListProduct';
import Logout from "../Logout";

export default function Dashboard() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList indicatorColor="secondary"
                        centered onChange={handleChange} aria-label="lab API tabs example">
                        <Tab sx={{ textColor: "primary"}} label={<Box sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}><DashboardIcon sx={{ margin:"0 5px 0 0" }}/> <div>Dashboard</div></Box>} value="1" />
                        <Tab sx={{ textColor: "primary" }} label={<Box sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}><AddCircleIcon sx={{ margin:"0 5px 0 0" }}/> <div>Create Product</div></Box>} value="2" />
                        <Tab sx={{ textColor: "primary" }} label={<Box sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}><ListAltIcon sx={{ margin:"0 5px 0 0" }}/> <div>List Product</div></Box>} value="3" />
                        <Tab sx={{ textColor: "primary" }} label={<Box sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}><LogoutIcon sx={{ margin:"0 5px 0 0" }}/> <div>Logout</div></Box>} value="4" />
                    </TabList>
                </Box>
                <Box>
                    <TabPanel value="1">
                        <Dashboad />
                    </TabPanel>
                    <TabPanel value="2">
                        <CreateProduct />
                    </TabPanel>
                    <TabPanel value="3">
                        <ListProduct/>
                    </TabPanel>
                    <TabPanel value="4">
                        <Logout/>
                    </TabPanel>
                </Box>
            </TabContext >
        </Box >
    );
}