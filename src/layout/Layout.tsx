import React from "react";

// Legacy Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Constants
import { constants } from "../constants/constants";

export const Layout = ()=> {
    return(
        <React.Fragment>
             <Box sx={{ flexGrow: 1 }}>
                <AppBar 
                    position="fixed"
                    color="transparent"
                    elevation={0}
                    sx={{width: '100vw', borderBottom: '1px solid #CCC'}}
                >
                    <Toolbar sx={{height: '64px'}}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {constants?.app_name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                </Box>
        </React.Fragment>
    )
}