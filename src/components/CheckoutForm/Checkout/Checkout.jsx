import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import { commerce } from '../../../lib/commerce';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm';
import { useSelector, useDispatch } from 'react-redux';
import { addPaymentAsync, showPayment, showShipping } from '../../../redux/payment-api-slice';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import Confirmation from '../Confirmation';
const steps = ['Shipping Address', 'Payment Details', 'Confirmation']
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
    const payment = useSelector(showPayment);
    const queryString = window.location.search;
    const dispatch = useDispatch();


    
    const urlParams = new URLSearchParams(queryString);
    const redirectStatus = urlParams.get('redirect_status');
    const confirmationPaymentIntent = urlParams.get('payment_intent');
    const confirmationClientSecret = urlParams.get('payment_intent_client_secret');

    const options = {
        // passing the client secret obtained in step 2
        clientSecret: payment.paymentIntent,
    };

    const addPaymentIntent = () => {
        dispatch(addPaymentAsync(checkoutToken));
    };

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token);
            } catch (tokenError) {
                console.log(tokenError);
            }
        }
        generateToken();
    }, [cart]);

    useEffect(() => {
        if (redirectStatus === 'succeeded') {
            lastStep();
        }
    }, [])
    

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const lastStep = () => setActiveStep((3));

    const next = () => {
        nextStep();
    }
    
    useEffect(() => {
        addPaymentIntent();
      },[checkoutToken]);
    

    const Form = () => (activeStep === 0)
        ? <AddressForm cart={cart} checkoutToken={checkoutToken} next={next}/>
        : <Elements stripe={stripePromise} options={options}><PaymentForm checkoutToken={checkoutToken} payment={payment} onCaptureCheckout={onCaptureCheckout} backStep={backStep} lastStep={lastStep} cart={cart} /></Elements>;

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 3 ? <Confirmation confirmationClientSecret={confirmationClientSecret} confirmationPaymentIntent={confirmationPaymentIntent} onCaptureCheckout={onCaptureCheckout}/> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout;