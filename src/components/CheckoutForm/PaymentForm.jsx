import React, { useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, useStripe, useElements, ElementsConsumer } from '@stripe/react-stripe-js';
import Review from './Checkout/Review';
import { useDispatch } from 'react-redux';
import { setReduxCartAsync } from '../../redux/payment-api-slice';



const PaymentForm = ({ cart, checkoutToken, backStep }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const setReduxCart = (cart) => {
      dispatch(setReduxCartAsync(cart));     
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);

    const result= await stripe.createToken(cardElement);
    console.log(result);
    };

  useEffect(() => {
    setReduxCart(cart);
  }, [])


  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
                    <form onSubmit = {(e) => handleSubmit(e, elements, stripe)}>
                      <CardElement />
                      <br/>
                      <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                        <Button variant="outlined" onClick={backStep}>Back</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={!stripe} >Pay {checkoutToken.subtotal.formatted_with_symbol}</Button>
                      </div>
                    </form>
    </>
  );
};



export default PaymentForm;