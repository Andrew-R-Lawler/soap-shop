import React from 'react'
import { Typography } from '@material-ui/core';

const Confirmation = (payment) => {
  return (
    <div>
        {console.log(payment)}
        <Typography>Confirmation</Typography>
    </div>
  )
}

export default Confirmation;