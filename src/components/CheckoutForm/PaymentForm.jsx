import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, PaymentElement, ElementsConsumer, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Checkout/Review';

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout, payment }) => {
    const stripe = useStripe();
    const elements = useElements(PaymentElement);
    const [paymentIntent, setPaymentIntent] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            redirect: 'if_required',
        }
    })

    const paymentMethod = await stripe.paymentMethods.retrieve(
        payment.paymentIntent
    );

    console.log(paymentMethod);
    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      console.log(orderData);
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    };
  };


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