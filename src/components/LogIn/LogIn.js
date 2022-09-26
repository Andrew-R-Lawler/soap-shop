import { Typography, Paper, TextField, Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUserAsync } from '../../redux/payment-api-slice';
import { fetchUserAsync } from '../../redux/payment-api-slice';

const LogIn = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const logInCredentials = {
        username: username,
        password: password,
    };

    const login = () => {
        dispatch(loginUserAsync(logInCredentials)).then(() => {
            dispatch(fetchUserAsync());
        })
    };



  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Sign-In</Typography>
                <div style={{ margin: '0px 0px 20px 0px'}} />
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}><TextField value={username} id='username' label='Username' onChange={(event) => {setUsername(event.target.value)}} /></Grid>
                    <Grid item xs={6} sm={6}><TextField value={password} id='password' label='Password' type='password' onChange={(event) => {setPassword(event.target.value)}} /></Grid>
                </Grid>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0px 0px 0px'}}>
                    <Typography variant='subtitle2' component={Link} to='/register'>Don't have an account? Sign Up</Typography>
                    <Button onClick={login} variant='contained' color='primary' >Submit</Button>
                </div>
            </Paper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Typography variant='subtitle2'>Forgot your password? Click here to get a new one</Typography>
        </div>
        </main>
    </>
  )
}

export default LogIn