import { createSlice } from '@reduxjs/toolkit';
const axios = require("axios");
const API_URL = "http://localhost:5000/api/payment";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        data: {},
        success: {},
        shipping: {},
        cart: {},
    },
    reducers: {
        addShipping: (state, action) => {
            state.shipping = action.payload
        },
    }
});

export const addShippingAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL+'/shipping', data);
        dispatch(addShipping(response.data.shippingData));
    } catch (err) {
        throw new Error(err)
    }
};



export const { addShipping } = paymentSlice.actions;
export const showShipping = (state) => state.payment.shipping;
export default paymentSlice.reducer;


