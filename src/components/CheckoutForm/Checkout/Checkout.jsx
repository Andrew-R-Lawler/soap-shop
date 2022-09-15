import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import { commerce } from '../../../lib/commerce';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm';
import { useSelector, useDispatch } from 'react-redux';
import { addPaymentAsync, showPayment } from '../../../redux/payment-api-slice';
import { Elements } from '@stripe/react-stripe-js';
const steps = ['Shipping Address', 'Payment Details', 'Confirmation']


const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const payment = useSelector(showPayment);
    const dispatch = useDispatch();
 

    
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
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    
    useEffect(() => {
        addPaymentIntent();
      },[checkoutToken]);
    

    const Form = () => (activeStep === 0)
        ? <AddressForm cart={cart} checkoutToken={checkoutToken} next={next}/>
        : <Elements stripe={stripePromise} options={options}><PaymentForm checkoutToken={checkoutToken} payment={payment} onCaptureCheckout={onCaptureCheckout} backStep={backStep} nextStep={nextStep}/></Elements>;

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
                {activeStep === steps.legnth ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout;