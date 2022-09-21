import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    // formatted string for EmptyCart text
    const addProducts = ' start adding some!';

    // This component renders when there are no items in the customer's cart
    const EmptyCart = () => (
        <div style={{margin: '10px 0px 0px 20px'}} >
        <Typography variant="subtitle1">You have no items in your shopping cart<Link to='/products' className={classes.link}>{addProducts}</Link></Typography>
        </div>
    );

    // This component renders all items in the customer's cart
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant='contained' onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkout} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

  return (
    <Container>
        <div className={classes.toolbar} />
        <div className={classes.header}>
            <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
        </div>
        {/* Renders cart based on whether or not items exist in the cart */}
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart/>}
    </Container>
  )
}

export default Cart