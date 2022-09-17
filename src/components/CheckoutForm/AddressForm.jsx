import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, Switch } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import { useDispatch } from 'react-redux';
import { addShippingAsync, addBillingAsync } from '../../redux/payment-api-slice';
import useStyles from './styles';


const AddressForm = ({ checkoutToken, cart, nextStep }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [billingFirstName, setBillingFirstName] = useState('');
    const [billingLastName, setBillingLastName] = useState('');
    const [billingAddress1, setBillingAddress1] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingZip, setBillingZip] = useState('');
    const [billingCountry, setBillingCountry] = useState('');
    const [billingSubdivision, setBillingSubdivision] = useState('');
    const dispatch = useDispatch();

    const shippingData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address1: address1,
        city: city,
        shippingSubdivision: shippingSubdivision,
        zip: zip,
        shippingCountry: shippingCountry,
        shippingOption: shippingOption,
    }

    const billingData = {
        firstName: billingFirstName,
        lastName: billingLastName,
        address1: billingAddress1,
        city: billingCity,
        zip: billingZip,
        billingCountry: billingCountry,
        billingSubdivision: billingSubdivision,
    }

    const methods = useForm();
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

    const fetchShippingCountries = async (checkoutToken) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutToken.id);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutToken, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutToken.id, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    const conditionalBilling = (checked) => {
        if (checked === true) {
            dispatch(addBillingAsync(shippingData))
        } else {
            console.log('billing data is')
        }

    }

    useEffect(() => {
        dispatch(addShippingAsync(shippingData))
        // eslint-disable-next-line
    }, [shippingSubdivision])

    useEffect(() => {
        dispatch(addBillingAsync(billingData))
        // eslint-disable-next-line
    }, [billingData])

    useEffect(() => {
        dispatch(addShippingAsync(shippingData))
        // eslint-disable-next-line
    }, [zip])

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
        // eslint-disable-next-line
    }, [cart])

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    // eslint-disable-next-line
    }, [shippingSubdivision])

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
      };
    
    const handleBillingFirstNameChange = event => {
        setBillingFirstName(event.target.value);
      };
    
    const handleLastNameChange = event => {
        setLastName(event.target.value);
    };

    const handleBillingLastNameChange = event => {
        setBillingLastName(event.target.value);
    };

    const handleAddress1Change = event => {
        setAddress1(event.target.value);
    };

    const handleBillingAddress1Change = event => {
        setBillingAddress1(event.target.value);
    };
    
    const handleEmailChange = event => {
        setEmail(event.target.value);
        };

    const handleCityChange = event => {
        setCity(event.target.value);
        };
    
    const handleBillingCityChange = event => {
        setBillingCity(event.target.value);
        };

    const handleZipChange = event => {
        setZip(event.target.value);
        };
    
    const handleBillingZipChange = event => {
        setBillingZip(event.target.value);
        };

    const handleShippingSubdivisionChange = event => {
        setShippingSubdivision(event.target.value)
        };

    const handleBillingSubdivisionChange = event => {
        setBillingSubdivision(event.target.value)
        };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);
            console.log('billing address switch changed')
        };
    
    
  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => nextStep())}>
                <Grid container spacing = {3}>
                    <Grid item xs={12} sm={6}><TextField required name="firstName" label="First Name" onChange={handleFirstNameChange} value={firstName} /></Grid>
                    <Grid item xs={12} sm={6}><TextField required name="lastName" label="Last Name" onChange={handleLastNameChange} value={lastName}/></Grid>
                    <Grid item xs={12} sm={6}><TextField required name="address1" label="Address" onChange={handleAddress1Change} value={address1} /></Grid>
                    <Grid item xs={12} sm={6}><TextField required name="email" label="E-Mail" onChange={handleEmailChange} value={email} /></Grid>
                    <Grid item xs={12} sm={6}><TextField required name="city" label="City" onChange={handleCityChange} value={city} /></Grid>
                    <Grid item xs={12} sm={6}><TextField required name="zip" label="ZIP / Postal Code" onChange={handleZipChange} value={zip} /></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={handleShippingSubdivisionChange}>
                            {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <Typography variant='subtitle1'>Use this address as billing address</Typography>
                <Switch className={classes.switch} checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} color="primary" />
                {(checked === true) ? null : 
                    <div style={{margin: '0px 0px 20px 0px'}}>
                        <Typography variant='h6'>Billing Address</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm= {6}><TextField required name="billingFirstName" label="First Name" onChange={handleBillingFirstNameChange} value={billingFirstName} /></Grid>
                                <Grid item xs={12} sm= {6}><TextField required name="billingLastName" label="Last Name" onChange={handleBillingLastNameChange} value={billingLastName} /></Grid>
                                <Grid item xs={12} sm= {6}><TextField required name="billingAddress1" label="Address" onChange={handleBillingAddress1Change} value={billingAddress1} /></Grid>
                                <Grid item xs={12} sm= {6}><TextField required name="billingCity" label="City" onChange={handleBillingCityChange} value={billingCity} /></Grid>
                                <Grid item xs={12} sm= {6}><TextField required name="billingCity" label="ZIP/Postal Code" onChange={handleBillingZipChange} value={billingZip} /></Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Shipping Country</InputLabel>
                                    <Select value={billingCountry} fullWidth onChange={(e) => setBillingCountry(e.target.value)}>
                                        {countries.map((country) => (
                                            <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Shipping Subdivision</InputLabel>
                                    <Select value={billingSubdivision} fullWidth onChange={handleBillingSubdivisionChange}>
                                        {subdivisions.map((subdivision) => (
                                            <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                    </div>
   
                }       
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button component={Link} to='/cart' variant="outlined">Back to Cart</Button>
                    <Button type="submit" variant="contained" color={'primary'}>Next</Button>
                </div>
            </form>
        </FormProvider>
    </>
  );
};

export default AddressForm