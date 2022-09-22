import { Typography, Paper, TextField } from '@material-ui/core'
import React from 'react'
import useStyles from './styles';

const LogIn = () => {
    const classes = useStyles();

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Log In</Typography>
                <form>
                    <TextField id='username' label='Username' />
                    <TextField id='password' label='Password' />
                </form>
            </Paper>
        </main>
    </>
  )
}

export default LogIn