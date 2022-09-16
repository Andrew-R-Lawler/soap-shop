import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentAsync, showPayment, showShipping, showSuccessfulPayment } from '../../redux/payment-api-slice';

const Confirmation = ({ confirmationPaymentIntent, confirmationClientSecret, onCaptureCheckout }) => {
    const payment = useSelector(showSuccessfulPayment);
    const dispatch = useDispatch();
    const checkoutToken = useSelector(showPayment);
    const shippingData = useSelector(showShipping);
    const confirmationObject = {
        id: confirmationPaymentIntent
    };
 
    const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          card: {
            payment_method_id: payment,
          }
        },
      };
      console.log();


    const fetchPaymentMethod = (secret) => {
        dispatch(getPaymentAsync(secret))
    };

    useEffect(() => {
        onCaptureCheckout(checkoutToken.id, orderData);
    }, []);

    useEffect(() => {
        fetchPaymentMethod(confirmationObject);
        console.log('run fetchPaymentMethod')
    },[confirmationClientSecret]);

  return (
    <div>
        <Typography>Confirmation</Typography>
    </div>
  )
}

export default Confirmation;