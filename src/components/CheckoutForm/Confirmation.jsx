import React from 'react'
import { Typography, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { addShipping } from '../../redux/payment-api-slice';
import useStyles from './styles';


const Confirmation = ( ) => {
  const classes = useStyles();
  const shipping = useSelector(addShipping);
  const shippingData = shipping.payload.payment.shipping;

  return (
    <div>
        <Typography variant={'h4'}>Order Confirmation</Typography>
        <Divider className={classes.divider1} />
        <div className={classes.shippingDiv} >
        <Typography className={classes.shippingHeader} variant={'h5'}>Shipping Information</Typography>
        <Divider className={classes.divider2} />
          <div className={classes.shippingSubtitle} >
            <Typography variant={'subtitle1'} >{shippingData.firstName} {shippingData.lastName}</Typography>
            <Typography variant={'subtitle1'}>{shippingData.email}</Typography>
            <Typography variant={'subtitle1'} >{shippingData.address1}</Typography>
            <Typography variant={'subtitle1'}>{shippingData.city}, {shippingData.shippingSubdivision} {shippingData.zip} </Typography>
          </div>
        </div>
    </div>
  )
}

export default Confirmation;