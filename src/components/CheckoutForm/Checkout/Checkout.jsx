import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import { commerce } from '../../../lib/commerce';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import Confirmation from '../Confirmation';
const steps = ['Shipping Address', 'Payment Details', 'Confirmation']
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
const Checkout = ({ cart, onCaptureCheckout, refreshCart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

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
    

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const lastStep = () => setActiveStep((3));
    

    const Form = () => (activeStep === 0)
        ? <AddressForm cart={cart} checkoutToken={checkoutToken} nextStep={nextStep}/>
        : <Elements stripe={stripePromise}><PaymentForm lastStep={lastStep} checkoutToken={checkoutToken} refreshCart={refreshCart} onCaptureCheckout={onCaptureCheckout} backStep={backStep} cart={cart} /></Elements>;

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
                {activeStep === 3 ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout;