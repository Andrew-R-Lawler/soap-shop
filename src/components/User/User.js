import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { Typography } from '@material-ui/core';
import { showUser } from '../../redux/payment-api-slice';
import { useSelector } from 'react-redux';
import { commerce } from '../../lib/commerce';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';



const User = () => {
    const classes = useStyles();
    const user = useSelector(showUser);
    const [loginToken, setLoginToken] = useState();

    if (user) {
        const customerLogin = () => {
            commerce.customer.login(user.email, 'http://localhost:3000/user').then((token) => {
                setLoginToken(token);
            })
        };
    }
    
    // adding changes to see if github desktop tracks it

    return (
        <>
            { user.email === '' ? 
                <><CircularProgress /></>
                :
                <>
                <div className={classes.toolbar} />
                <main className={classes.layout}>
                    <Typography>the fuck is wrong with my page</Typography>
                    <Typography>i just want it to render from the email</Typography>
                </main>
                </>
            }
        </>
    )
}


export default User