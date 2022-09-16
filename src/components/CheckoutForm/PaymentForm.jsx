import React, { useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Checkout/Review';
import { useDispatch } from 'react-redux';
import { setReduxCartAsync, showShipping } from '../../redux/payment-api-slice';
import { useSelector } from 'react-redux';

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({shipping, cart, checkoutToken, backStep }) => {
    const stripe = useStripe();
    const elements = useElements(PaymentElement);
    const dispatch = useDispatch();
    const setReduxCart = (cart) => {
      dispatch(setReduxCartAsync(cart));     
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: 'http://localhost:3001/checkout',
            payment_method_data: {
                card: PaymentElement
            }
        }
    });




  };

  useEffect(() => {
    setReduxCart(cart);
  }, [])


  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            <form onSubmit = {handleSubmit}>
                <PaymentElement />
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" color="primary">Pay {checkoutToken.subtotal.formatted_with_symbol}</Button>
                </div>
            </form>
    </>
  );
};



export default PaymentForm;