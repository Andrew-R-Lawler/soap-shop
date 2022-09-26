import { Typography, Paper, TextField, Button } from '@material-ui/core'
import { Email } from '@material-ui/icons';
import React, { useState } from 'react'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../../redux/payment-api-slice';

const Register = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const registerCredentials = {
        username: username,
        email: email,
        password: password,
    }

    const register = () => {
        dispatch(registerUserAsync(registerCredentials));
    };

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Register</Typography>
                <form>
                    <TextField value={username} id='username' label='Username' onChange={(event) => {setUsername(event.target.value)}} />
                    <TextField value={email} id='email' label='E-Mail' onChange={(event) => {setEmail(event.target.value)}} />
                    <TextField value={password} id='password' label='Password' type='password' onChange={(event) => {setPassword(event.target.value)}} />
                    <Button onClick={register}>Submit</Button>
                </form>
            </Paper>
        </main>
    </>
  )
}

export default Register