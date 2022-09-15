import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentAsync, showSuccessfulPayment } from '../../redux/payment-api-slice';

const Confirmation = ({ confirmationPaymentIntent, confirmationClientSecret }) => {
    const [paymentMethod, setPaymentMethod] = useState({});
    const payment = useSelector(showSuccessfulPayment);
    const dispatch = useDispatch();
    const confirmationObject = {
        id: confirmationPaymentIntent
    }

    const fetchPaymentMethod = (secret) => {
        dispatch(getPaymentAsync(secret))
    };

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