import { createSlice } from '@reduxjs/toolkit';
const axios = require("axios");
const API_URL = "http://localhost:5000/api/payment";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        shipping: {},
        billing: {},
    },
    reducers: {
        addShipping: (state, action) => {
            state.shipping = action.payload
        },
        addBilling: (state, action) => {
            state.billing = action.payload
        }
    }
});

export const addShippingAsync = (data) => async (dispatch) => {
    try {
        dispatch(addShipping(data));
    } catch (err) {
        throw new Error(err);
    }
};

export const addBillingAsync = (data) => async (dispatch) => {
    try {
        dispatch(addBilling(data))
    } catch (err) {
        throw new Error(err);
    }
}



export const { addShipping, addBilling } = paymentSlice.actions;
export const showShipping = (state) => state.payment.shipping;
export const showBilling = (state) => state.payment.billing;
export default paymentSlice.reducer;


