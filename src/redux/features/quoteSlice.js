import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../../utils";

const initialState = {
  quotes: [],
  userQuotes: [],
  isLoading: false,
  error: null,
};

export const actionGetAllQuotes = createAsyncThunk(
  "quote/actionGetAllQuotes",
  async (_, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.get("/quote/getAllQuotes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionGetMyQuotes = createAsyncThunk(
  "quote/actionGetMyQuotes",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.get("/quote/getMyQuotes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionGetSingleQuote = createAsyncThunk(
  "quote/actionGetSingleQuote",
  async (id, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.get(`/quote/getSingleQuote/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionCreateQuote = createAsyncThunk(
  "quote/actionCreateQuote",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.post("/quote/create", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionDeleteQuote = createAsyncThunk(
  "quote/actionDeleteQuote",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.delete(`/quote/deleteQuote/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionUpdateQuote = createAsyncThunk(
  "quote/actionUpdateQuote",
  async ({ quote, id }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.patch(`/quote/updateQuote/${id}`, quote);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetAllQuotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionGetAllQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotes = action.payload.result;
      })
      .addCase(actionGetAllQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionGetMyQuotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionGetMyQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userQuotes = action.payload.result;
      })
      .addCase(actionGetMyQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionCreateQuote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionCreateQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotes.unshift(action.payload.result);
        state.userQuotes.unshift(action.payload.result);
      })
      .addCase(actionCreateQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionDeleteQuote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionDeleteQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotes = state.quotes.filter((item) => {
          return item._id !== action.payload.result._id;
        });
        state.userQuotes = state.userQuotes.filter((item) => {
          return item._id !== action.payload.result._id;
        });
      })
      .addCase(actionDeleteQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionUpdateQuote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionUpdateQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotes = state.quotes.map((item) => {
          if (item._id === action.payload.result._id) {
            return action.payload.result;
          } else {
            return item;
          }
        });
        state.userQuotes = state.userQuotes.map((item) => {
          if (item._id === action.payload.result._id) {
            return action.payload.result;
          } else {
            return item;
          }
        });
      })
      .addCase(actionUpdateQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default quoteSlice.reducer;
