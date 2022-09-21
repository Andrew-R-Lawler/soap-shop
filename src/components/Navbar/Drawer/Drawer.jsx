import React, { useState } from 'react'
import { Drawer, Typography, Box, IconButton, Divider } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/commerce.png';
import useStyles from '../styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';


export const NavDrawer = () => {
    // initializes drawer open state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // imports classes object from ../styles.js
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
                <List>
                    <ListItem key='home' disablePadding>
                        <ListItemButton component={Link} to='/'>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='products' disablePadding>
                        <ListItemButton component={Link} to='/'>
                            <ListItemIcon>
                                <SellIcon />
                            </ListItemIcon>
                            <ListItemText>Products</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='products' disablePadding>
                        <ListItemButton component={Link} to='/cart'>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText>Your Shopping Cart</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='products' disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HelpCenterIcon />
                            </ListItemIcon>
                            <ListItemText>Support</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
  )
}
