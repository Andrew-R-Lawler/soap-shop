import { Typography, Paper, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './styles';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logInCredentials = {
        username: username,
        password: password,
    }

    const login = () => {};

  return (
    <>
    {console.log(logInCredentials)}
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Log In</Typography>
                <form>
                    <TextField value={username} id='username' label='Username' onChange={(event) => {setUsername(event.target.value)}} />
                    <TextField value={password} id='password' label='Password' type='password' onChange={(event) => {setPassword(event.target.value)}} />
                    <Button onClick={login}>Submit</Button>
                    <Button component={Link} to='/register'>Register Account</Button>
                </form>
            </Paper>
        </main>
    </>
  )
}

export default LogIn