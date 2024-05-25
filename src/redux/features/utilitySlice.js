import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../../utils";
import { actionLogout } from "./userSlice";

const initialState = {
  likes: [],
  saved: [],
  isLoading: false,
  error: null,
};

export const actionGetSaveQuotes = createAsyncThunk(
  "utility/actionGetSaveQuotes",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.get(`/utility/saved`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const actionGetLikeQuotes = createAsyncThunk(
  "utility/actionGetLikeQuotes",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.get(`/utility/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionLikeQuote = createAsyncThunk(
  "utility/actionLikeQuote",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user;
      const API = getAPI(user.token);
      const response = await API.post(`/utility/like/${id}`);
      return { user, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionSaveQuote = createAsyncThunk(
  "utility/actionSaveQuote",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.post(`/utility/saved/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetLikeQuotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionGetLikeQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likes = action.payload.result;
      })
      .addCase(actionGetLikeQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionGetSaveQuotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionGetSaveQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.saved = action.payload.result;
      })
      .addCase(actionGetSaveQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionLikeQuote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionLikeQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        const quoteId = action.payload.data.result._id;
        const index = state.likes.indexOf(quoteId);
        if (index !== -1) {
          state.likes.splice(index, 1);
        } else {
          state.likes.unshift(quoteId);
        }
      })
      .addCase(actionLikeQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.data || action.error.message;
      })
      .addCase(actionSaveQuote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionSaveQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        const quoteId = action.payload.result._id;
        const existingIndex = state.saved.findIndex(
          (item) => item._id === quoteId
        );
        if (existingIndex !== -1) {
          state.saved.splice(existingIndex, 1);
        } else {
          state.saved.push(action.payload.result);
        }
      })
      .addCase(actionSaveQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionLogout.fulfilled, (state, action) => {
        state.likes = [];
        state.saved = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default utilitySlice.reducer;
