import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Review from './Checkout/Review';
import { useSelector } from 'react-redux';
import { addShipping } from '../../redux/payment-api-slice';




const PaymentForm = ({ checkoutToken, backStep, lastStep, onCaptureCheckout, refreshCart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const shipping = useSelector(addShipping);
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const result= await stripe.createToken(cardElement);
    const shippingData = shipping.payload.payment.shipping;
    console.log(result);    
    const orderData = {
      line_items: checkoutToken.line_items,
      customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
      shipping: { name: 'Domestic', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'stripe',
        card: {
          token: result.token.id
        }
      },
    };
    onCaptureCheckout(checkoutToken, orderData);
    refreshCart();
    lastStep();
    };




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