import React from 'react'
import useStyles from './styles';
import { Typography } from '@material-ui/core';
import { showUser } from '../../redux/payment-api-slice';
import { useSelector } from 'react-redux';

const User = () => {
    const classes = useStyles();
    const user = useSelector(showUser);

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Typography>{user.username}</Typography>
            <Typography>{user.email}</Typography>
        </main>
    </>
  )
}

export default User