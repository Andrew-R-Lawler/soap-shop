import React from 'react'
import { Typography, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { showShipping, showBilling } from '../../redux/payment-api-slice';
import useStyles from './styles';


const Confirmation = ( ) => {
  // initializes classes object from ./styles
  const classes = useStyles();

  // creates shipping data object from react-redux state
  const shippingData = useSelector(showShipping);

  // creates billing data object from react-redux state
  const billingData = useSelector(showBilling);

  return (
    <div>
        <Typography variant={'h4'}>Order Confirmation</Typography>
        <Divider className={classes.divider1} />
        <div className={classes.confirmationDiv} >
          <Typography variant={'subtitle1'} >Thank you for your order! Shipping tracking and order confirmation will be sent to you at {shippingData.email}. If you have any questions feel free to reach out to support at <a href="mailto:Andrew.R.Lawler@gmail.com">Andrew.R.Lawler@gmail.com</a></Typography>
        </div>
        <div className={classes.shippingDiv} >
          <Typography className={classes.shippingHeader} variant={'h5'}>Shipping Information</Typography>
          <Divider className={classes.divider2} />
          <div className={classes.shippingSubtitle} >
            <Typography variant={'subtitle1'} >{shippingData.firstName} {shippingData.lastName}</Typography>
            <Typography variant={'subtitle1'} >{shippingData.address1}</Typography>
            <Typography variant={'subtitle1'}>{shippingData.city}, {shippingData.shippingSubdivision} {shippingData.zip} </Typography>
          </div>
        </div>
        {(billingData.firstName === '') ? 
        <div className={classes.shippingDiv} >
          <Typography className={classes.shippingHeader} variant={'h5'}>Shipping Information</Typography>
          <Divider className={classes.divider2} />
          <div className={classes.shippingSubtitle} >
            <Typography variant={'subtitle1'} >{shippingData.firstName} {shippingData.lastName}</Typography>
            <Typography variant={'subtitle1'} >{shippingData.address1}</Typography>
            <Typography variant={'subtitle1'}>{shippingData.city}, {shippingData.shippingSubdivision} {shippingData.zip} </Typography>
          </div>
        </div>
         :
        <div className={classes.shippingDiv} >
          <Typography className={classes.shippingHeader} variant={'h5'}>Billing Information</Typography>
          <Divider className={classes.divider2} />
          <div className={classes.shippingSubtitle} >
            <Typography variant={'subtitle1'} >{billingData.firstName} {billingData.lastName}</Typography>
            <Typography variant={'subtitle1'} >{billingData.address1}</Typography>
            <Typography variant={'subtitle1'}>{billingData.city}, {billingData.shippingSubdivision} {billingData.zip} </Typography>
          </div>
        </div>
        }
    </div>
  )
}

export default Confirmation;