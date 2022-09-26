import { Typography, Paper, TextField, Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../../redux/payment-api-slice';
import { useNavigate} from 'react-router-dom';

const Register = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerCredentials = {
        username: username,
        email: email,
        password: password,
    }

    const register = () => {
        dispatch(registerUserAsync(registerCredentials));
        navigate('/login')
    };

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Sign-Up</Typography>
                <div style={{ margin: '0px 0px 20px 0px'}} />
                <form onSubmit={register}>
                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={6}><TextField value={username} id='username' label='Username' required onChange={(event) => {setUsername(event.target.value)}} /></Grid>
                        <Grid item sm={6} xs={6}><TextField value={password} id='password' label='Password' required type='password' onChange={(event) => {setPassword(event.target.value)}} /></Grid>
                        <Grid item sm={6} xs={6}><TextField value={email} id='email' label='E-Mail' required onChange={(event) => {setEmail(event.target.value)}} /></Grid>
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0px 0px 0px' }}>
                        <Button type='submit' variant='contained' color='primary'>Submit</Button>
                    </div>
                </form>
            </Paper>
        </div>
        </main>
    </>
  )
}

export default Register