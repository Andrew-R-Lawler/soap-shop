import { Typography } from '@material-ui/core'
import React from 'react';
import useStyles from './styles';

const HomePage = () => {
    const classes = useStyles();
  return (
    <>
        <div className={classes.toolbar} />
        <Typography>Branded Homepage to be added here</Typography>
    </>
  )
}

export default HomePage