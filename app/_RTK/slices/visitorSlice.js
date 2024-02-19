import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "@/app/_utilize/axiosClient";

const initialToken = localStorage.getItem('token');

export const fetchVisitor = createAsyncThunk(
  "visitor/fetchVisitor",
  async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${initialToken ? initialToken : token}`,
          "Accept-Language": "en",
        },
      });
      return response.data.data.user;
    } catch (error) {
      console.error("Error fetching visitor:", error); // Log any errors
      throw error;
    }
  }
);

const visitorSlice = createSlice({
  name: "visitor",
  initialState: {},
  reducers: {
    increment: (state, action) => {
      return state - 1;
    },
    decrement: (state, action) => {
      return state + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVisitor.fulfilled, (state, action) => {
      return state = action.payload;
    });
  },
});

export const {increment,decrement} = visitorSlice.actions;

export default visitorSlice.reducer;
