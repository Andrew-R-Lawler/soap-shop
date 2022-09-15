import { createSlice } from '@reduxjs/toolkit';
const axios = require("axios");
const API_URL = "http://localhost:5000/api/payment";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        data: {},
        success: {},
    },
    reducers: {
        addPayment: (state, action) => {
            state.data = action.payload
        },
        getPayment: (state, action) => {
            state.success = action.payload
        }
    }
});

export const addPaymentAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL, data);
        dispatch(addPayment(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const getPaymentAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL+'/success', data);
        dispatch(getPayment(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export const { addPayment, getPayment } = paymentSlice.actions;
export const showPayment = (state) => state.payment.data;
export const showSuccessfulPayment = (state) => state.payment.success;
export default paymentSlice.reducer;


