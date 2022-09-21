import { Typography } from '@material-ui/core'
import React from 'react';
import useStyles from './styles';

const Support = () => {
    const classes = useStyles();

  return (
    <>
        <div className={classes.toolbar} />
        <Typography>Support</Typography>
    </>
  )
}

export default Support