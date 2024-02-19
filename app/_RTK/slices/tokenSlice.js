'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "@/app/_utilize/axiosClient";

// Define an async thunk action creator to fetch the token
export const fetchToken = createAsyncThunk("token/fetchToken", async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, data, {
      headers: {
        "Accept-Language": "en", // Assuming you want to set the language to English
      },
    });
    const token = response.data.data.token; // Assuming the token is in the data object of the response
    localStorage.setItem('token', token); // Save token in local storage
    return token;
  } catch (error) {
    throw error; // Throw any errors for handling in the component
  }
});


const tokenSlice = createSlice({
  name: "token",
  initialState: null,
  reducers: {
    increment: (state, action) => {
      return state - 1;
    },
    decrement: (state, action) => {
      return state + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      localStorage.setItem('localToken',action.payload)
      return action.payload; // Update the token state with the fetched token
    });
  },
});

export const { increment, decrement } = tokenSlice.actions;

export default tokenSlice.reducer;
