import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Review from './Checkout/Review';
import { useSelector } from 'react-redux';
import { showShipping, showBilling } from '../../redux/payment-api-slice';




const PaymentForm = ({ checkoutToken, backStep, lastStep, onCaptureCheckout, refreshCart }) => {
    const [orderData, setOrderData] = useState({});
    const stripe = useStripe();
    const elements = useElements();
    const shipping = useSelector(showShipping);
    const billing = useSelector(showBilling);

    const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(shipping);
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result= await stripe.createToken(cardElement);
    
      const shippingOrderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shipping.firstName, lastname: shipping.lastName, email: shipping.email },
        shipping: { name: shipping.firstName+' '+shipping.lastName, street: shipping.address1, town_city: shipping.city, county_state: shipping.shippingSubdivision, postal_zip_code: shipping.zip, country: shipping.shippingCountry },
        fulfillment: {
          shipping_method: shipping.shippingOption,
        },
        billing: {
          name: shipping.firstName+' '+shipping.lastName,
          street: shipping.address1,
          town_city: shipping.city,
          county_state: shipping.shippingSubdivision,
          postal_zip_code: shipping.zip,
          country: shipping.shippingCountry,
        },
        payment: {
          gateway: 'stripe',
          card: {
            token: result.token.id
          }
        },
      };

      const billingOrderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shipping.firstName, lastname: shipping.lastName, email: shipping.email },
        shipping: { name: shipping.firstName+' '+shipping.lastName, street: shipping.address1, town_city: shipping.city, county_state: shipping.shippingSubdivision, postal_zip_code: shipping.zip, country: shipping.shippingCountry },
        fulfillment: {
          shipping_method: shipping.shippingOption,
        },
        billing: {
          name: billing.firstName+' '+billing.lastName,
          street: billing.address1,
          town_city: billing.city,
          county_state: billing.billingSubdivision,
          postal_zip_code: billing.zip,
          country: billing.billingCountry,
        },
        payment: {
          gateway: 'stripe',
          card: {
            token: result.token.id
          }
        },
      };
      
      
    console.log(shippingOrderData);
    if (billing.firstName === '') {
      onCaptureCheckout(checkoutToken, shippingOrderData);
    } else {
      onCaptureCheckout(checkoutToken, billingOrderData);
    }
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