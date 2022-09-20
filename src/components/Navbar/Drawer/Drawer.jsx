import React, { useState } from 'react'
import { Drawer, Typography, Box, IconButton, Divider } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/commerce.png';
import useStyles from '../styles';


export const NavDrawer = () => {
    // initializes drawer open state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const classes = useStyles();

  return (
    <>
        <IconButton size = 'large' edge = 'start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
        </IconButton>
        <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
            <Box p={2} width='250px' textAlign='center' role='presentation'>
                    <div className={classes.drawerTitle} >
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image2} />
                        Web Shop
                    </Typography>
                    </div>
                    <Divider />
            </Box>
        </Drawer>
    </>
  )
}
