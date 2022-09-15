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

    console.log(shippingData);
    const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: payment.sucess,
          },
        },
      };
      console.log(orderData);


    const fetchPaymentMethod = (secret) => {
        dispatch(getPaymentAsync(secret))
    };

    useEffect(() => {
        onCaptureCheckout(checkoutToken.id, orderData);
    }, [orderData]);

    useEffect(() => {
        fetchPaymentMethod(confirmationObject);
        console.log('run fetchPaymentMethod')
    },[confirmationClientSecret]);

  return (
    <div>
    {console.log(payment)}
        <Typography>Confirmation</Typography>
    </div>
  )
}

export default Confirmation;