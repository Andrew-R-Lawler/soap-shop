import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, Switch } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import { useDispatch } from 'react-redux';
import { addShippingAsync, addBillingAsync } from '../../redux/payment-api-slice';
import useStyles from './styles';
import Swal from 'sweetalert2/dist/sweetalert2';


const AddressForm = ({ checkoutToken, cart, nextStep }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [checkSt, setCheckSt] = useState('');
    const [zipStatus, checkZipStatus] = useState('');
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
    const Swal = require('sweetalert2')

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

    useEffect(() => {
        dispatch(addShippingAsync(shippingData))
        // eslint-disable-next-line
    }, [shippingData])

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
    
    const getState = (zipString) => {

        /* Ensure param is a string to prevent unpredictable parsing results */
        if (typeof zipString !== 'string') {
            console.log('Must pass the zipcode as a string.');
            return;
        }

        /* Ensure we have exactly 5 characters to parse */
        if (zipString.length !== 5) {
            console.log('Must pass a 5-digit zipcode.');
            return;
        }

        /* Ensure we don't parse strings starting with 0 as octal values */
        const zipcode = parseInt(zipString, 10);

        let st;
        let state;

        /* Code cases alphabetized by state */
        if (zipcode >= 35000 && zipcode <= 36999) {
            st = 'AL';
            state = 'Alabama';
        } else if (zipcode >= 99500 && zipcode <= 99999) {
            st = 'AK';
            state = 'Alaska';
        } else if (zipcode >= 85000 && zipcode <= 86999) {
            st = 'AZ';
            state = 'Arizona';
        } else if (zipcode >= 71600 && zipcode <= 72999) {
            st = 'AR';
            state = 'Arkansas';
        } else if (zipcode >= 90000 && zipcode <= 96699) {
            st = 'CA';
            state = 'California';
        } else if (zipcode >= 80000 && zipcode <= 81999) {
            st = 'CO';
            state = 'Colorado';
        } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
            st = 'CT';
            state = 'Connecticut';
        } else if (zipcode >= 19700 && zipcode <= 19999) {
            st = 'DE';
            state = 'Delaware';
        } else if (zipcode >= 32000 && zipcode <= 34999) {
            st = 'FL';
            state = 'Florida';
        } else if ( (zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999) ) {
            st = 'GA';
            state = 'Georgia';
        } else if (zipcode >= 96700 && zipcode <= 96999) {
            st = 'HI';
            state = 'Hawaii';
        } else if (zipcode >= 83200 && zipcode <= 83999) {
            st = 'ID';
            state = 'Idaho';
        } else if (zipcode >= 60000 && zipcode <= 62999) {
            st = 'IL';
            state = 'Illinois';
        } else if (zipcode >= 46000 && zipcode <= 47999) {
            st = 'IN';
            state = 'Indiana';
        } else if (zipcode >= 50000 && zipcode <= 52999) {
            st = 'IA';
            state = 'Iowa';
        } else if (zipcode >= 66000 && zipcode <= 67999) {
            st = 'KS';
            state = 'Kansas';
        } else if (zipcode >= 40000 && zipcode <= 42999) {
            st = 'KY';
            state = 'Kentucky';
        } else if (zipcode >= 70000 && zipcode <= 71599) {
            st = 'LA';
            state = 'Louisiana';
        } else if (zipcode >= 3900 && zipcode <= 4999) {
            st = 'ME';
            state = 'Maine';
        } else if (zipcode >= 20600 && zipcode <= 21999) {
            st = 'MD';
            state = 'Maryland';
        } else if ( (zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501) || (zipcode == 5544 ) ) {
            st = 'MA';
            state = 'Massachusetts';
        } else if (zipcode >= 48000 && zipcode <= 49999) {
            st = 'MI';
            state = 'Michigan';
        } else if (zipcode >= 55000 && zipcode <= 56899) {
            st = 'MN';
            state = 'Minnesota';
        } else if (zipcode >= 38600 && zipcode <= 39999) {
            st = 'MS';
            state = 'Mississippi';
        } else if (zipcode >= 63000 && zipcode <= 65999) {
            st = 'MO';
            state = 'Missouri';
        } else if (zipcode >= 59000 && zipcode <= 59999) {
            st = 'MT';
            state = 'Montana';
        } else if (zipcode >= 27000 && zipcode <= 28999) {
            st = 'NC';
            state = 'North Carolina';
        } else if (zipcode >= 58000 && zipcode <= 58999) {
            st = 'ND';
            state = 'North Dakota';
        } else if (zipcode >= 68000 && zipcode <= 69999) {
            st = 'NE';
            state = 'Nebraska';
        } else if (zipcode >= 88900 && zipcode <= 89999) {
            st = 'NV';
            state = 'Nevada';
        } else if (zipcode >= 3000 && zipcode <= 3899) {
            st = 'NH';
            state = 'New Hampshire';
        } else if (zipcode >= 7000 && zipcode <= 8999) {
            st = 'NJ';
            state = 'New Jersey';
        } else if (zipcode >= 87000 && zipcode <= 88499) {
            st = 'NM';
            state = 'New Mexico';
        } else if ( (zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390) || (zipcode == 501) || (zipcode == 544) ) {
            st = 'NY';
            state = 'New York';
        } else if (zipcode >= 43000 && zipcode <= 45999) {
            st = 'OH';
            state = 'Ohio';
        } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999) ) {
            st = 'OK';
            state = 'Oklahoma';
        } else if (zipcode >= 97000 && zipcode <= 97999) {
            st = 'OR';
            state = 'Oregon';
        } else if (zipcode >= 15000 && zipcode <= 19699) {
            st = 'PA';
            state = 'Pennsylvania';
        } else if (zipcode >= 300 && zipcode <= 999) {
            st = 'PR';
            state = 'Puerto Rico';
        } else if (zipcode >= 2800 && zipcode <= 2999) {
            st = 'RI';
            state = 'Rhode Island';
        } else if (zipcode >= 29000 && zipcode <= 29999) {
            st = 'SC';
            state = 'South Carolina';
        } else if (zipcode >= 57000 && zipcode <= 57999) {
            st = 'SD';
            state = 'South Dakota';
        } else if (zipcode >= 37000 && zipcode <= 38599) {
            st = 'TN';
            state = 'Tennessee';
        } else if ( (zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) ||  (zipcode >= 88500 && zipcode <= 88599) ) {
            st = 'TX';
            state = 'Texas';
        } else if (zipcode >= 84000 && zipcode <= 84999) {
            st = 'UT';
            state = 'Utah';
        } else if (zipcode >= 5000 && zipcode <= 5999) {
            st = 'VT';
            state = 'Vermont';
        } else if ( (zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598) ) {
            st = 'VA';
            state = 'Virginia';
        } else if ( (zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999) ) {
            st = 'DC';
            state = 'Washington DC';
        } else if (zipcode >= 98000 && zipcode <= 99499) {
            st = 'WA';
            state = 'Washington';
        } else if (zipcode >= 24700 && zipcode <= 26999) {
            st = 'WV';
            state = 'West Virginia';
        } else if (zipcode >= 53000 && zipcode <= 54999) {
            st = 'WI';
            state = 'Wisconsin';
        } else if (zipcode >= 82000 && zipcode <= 83199) {
            st = 'WY';
            state = 'Wyoming';
        } else {
            st = 'none';
            state = 'none';
            console.log('No state found matching', zipcode);
        }
        setCheckSt(st);
        return st;
        }

    const zipCheck = () => {
        if (checkSt === shippingSubdivision) {
            nextStep();
        } else {
            Swal.fire({
                title: 'Error!',
                text: `Provided ZIP code is not valid for ${shippingSubdivision}`,
                icon: 'error',
                confirmationButtonText: 'Back',
            })
        }
    };
    
    useEffect(() => {
        getState(zip);
    },[zip]);
    console.log(checkSt)
    
  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => zipCheck())}>
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