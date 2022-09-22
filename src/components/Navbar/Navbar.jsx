import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { NavDrawer } from './Drawer/Drawer';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = ({ cart }) => {

    // imports classes object form ./styles
    const classes = useStyles();

    // checks for existence of cart
    const cartLoading = !cart;

    //checks for pathname
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <NavDrawer />
                    <Typography component={Link} to='/' variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Web Shop
                    </Typography>
                    <div className={classes.grow} />
                        {/* if pathname is /products Shopping cart will render into Navbar */}
                        { location.pathname === '/products' && (
                            <div className={classes.button}>
                                <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
                                    { cartLoading ? 
                                        <Badge badgeContent={0} color="secondary">
                                            <ShoppingCart />
                                        </Badge>
                                        :
                                        <Badge badgeContent={cart.total_items} color="secondary" overlap='rectangular'>
                                            <ShoppingCart />
                                        </Badge>
                                    }
                                </IconButton>
                            </div>
                        )}
                        {/* if pathname is at root shopping cart will render into Navbar */}
                        { location.pathname === '/' && (
                            <div className={classes.button}>
                                <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
                                    { cartLoading ? 
                                        <Badge badgeContent={0} color="secondary">
                                            <ShoppingCart />
                                        </Badge>
                                        :
                                        <Badge badgeContent={cart.total_items} color="secondary" overlap='rectangular'>
                                            <ShoppingCart />
                                        </Badge>
                                    }
                                </IconButton>
                            </div>
                        )}
                        <Button component={Link} to='/login'>Log In/Register</Button>      
                </Toolbar>
            </AppBar>
        </>
  )
}

export default Navbar