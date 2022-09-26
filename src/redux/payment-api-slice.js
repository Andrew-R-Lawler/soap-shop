import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// creates redux payment slice
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
        },
        registerUser: (state, action) => {
            state.register = action.payload
        },
        loginUser: (state, action) => {
            state.login = action.payload
        },
        fetchUser: (state, action) => {
            state.user =  action.payload
        }
    }
});

// asyncronous user registration post
export const registerUserAsync = (data) => async (dispatch) => {
    try {
        console.log(data);
        await axios.post('http://localhost:5000/api/user/register', {data});
    } catch (err) {
        throw new Error(err);
    }
}

export const loginUserAsync = (data) => async (dispatch) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        await axios.post('http://localhost:5000/api/user/login', {username: data.username, password: data.password}, config);
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchUserAsync = (data) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
    const response = await axios.get('http://localhost:5000/api/user/', config);
    dispatch(fetchUser(response.data))
}

// dispatches shipping data to redux store
export const addShippingAsync = (data) => async (dispatch) => {
    try {
        dispatch(addShipping(data));
    } catch (err) {
        throw new Error(err);
    }
};

// dispatches billing data to redux store
export const addBillingAsync = (data) => async (dispatch) => {
    try {
        dispatch(addBilling(data))
    } catch (err) {
        throw new Error(err);
    }
}

// exports dispatch actions
export const { addShipping, addBilling, registerUser, loginUser, fetchUser } = paymentSlice.actions;

// exports hooks for accessing store data
export const showShipping = (state) => state.payment.shipping;
export const showBilling = (state) => state.payment.billing;
export const showUser = (state) => state.payment.user;

export default paymentSlice.reducer;


