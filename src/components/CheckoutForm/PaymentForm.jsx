import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Review from './Checkout/Review';
import { useSelector } from 'react-redux';
import { showShipping, showBilling } from '../../redux/payment-api-slice';

const PaymentForm = ({ checkoutToken, backStep, lastStep, onCaptureCheckout, refreshCart }) => {

    // initialize order data state
    const [orderData, setOrderData] = useState({});

    // creates stripe object using useStripe hook
    const stripe = useStripe();

    // creates stripe elements object using useElements hook
    const elements = useElements();

    // creates shipping object from react-redux state
    const shipping = useSelector(showShipping);

    // creates billing object from react-redux state
    const billing = useSelector(showBilling);

    // handles checkout on submit
    const handleSubmit = async (event) => {

    // keeps page from reloading
    event.preventDefault();
    
    // if stripe and elements aren't active function will return here
    if (!stripe || !elements) return;
    
    // creates object from CardElement inputs
    const cardElement = elements.getElement(CardElement);

    // creates card token for completeing payment
    const result = await stripe.createToken(cardElement);
      
      // order data object for when shipping and billing are the same
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

      // order data object for when shipping and billing are different
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
      
    // checkout capture conditional determines whether billing data exists, fires function with correct order data 
    if (billing.firstName === '') {
      onCaptureCheckout(checkoutToken, shippingOrderData);
    } else {
      onCaptureCheckout(checkoutToken, billingOrderData);
    }

    // clears current cart
    refreshCart();

    // sends customer to confirmation page
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