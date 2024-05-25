import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../../utils";
import { actionLikeQuote } from "./utilitySlice";
import { actionLogout } from "./userSlice";

const initialState = {
  quotes: [],
  userQuotes: [],
  searchQuotes: [],
  authorQuotes: null,
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

export const actionAuthorQuotes = createAsyncThunk(
  "quote/actionAuthorQuotes",
  async (id, { rejectWithValue, getState }) => {
    try {
      const API = getAPI();
      const response = await API.get(`/quote/author/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionSearchQuotes = createAsyncThunk(
  "quote/actionSearchQuotes",
  async (query, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.get(`/quote/search?query=${query}`);
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
        if (
          state.authorQuotes &&
          state.authorQuotes.author &&
          state.authorQuotes.author._id === action.payload.result.author._id
        ) {
          state.authorQuotes.quotes.unshift(action.payload.result);
        }
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
      })
      .addCase(actionAuthorQuotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionAuthorQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorQuotes = action.payload.result;
      })
      .addCase(actionAuthorQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionSearchQuotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actionSearchQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchQuotes = action.payload.result;
      })
      .addCase(actionSearchQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionLikeQuote.fulfilled, (state, action) => {
        const likedQuote = action.payload.data.result;
        const userId = action.payload.user.user._id;
        const indexInQuotes = state.quotes.findIndex(
          (quote) => quote._id === likedQuote._id
        );
        const indexInUserQuotes = state.userQuotes.findIndex(
          (quote) => quote._id === likedQuote._id
        );
        if (indexInQuotes !== -1) {
          if (state.quotes[indexInQuotes].likes.includes(userId)) {
            state.quotes[indexInQuotes].likes = state.quotes[
              indexInQuotes
            ].likes.filter((id) => id !== userId);
          } else {
            state.quotes[indexInQuotes].likes.push(userId);
          }
        }
        if (indexInUserQuotes !== -1) {
          if (state.userQuotes[indexInUserQuotes].likes.includes(userId)) {
            state.userQuotes[indexInUserQuotes].likes = state.userQuotes[
              indexInUserQuotes
            ].likes.filter((id) => id !== userId);
          } else {
            state.userQuotes[indexInUserQuotes].likes.push(userId);
          }
        }
      })
      .addCase(actionLogout.fulfilled, (state, action) => {
        state.userQuotes = [];
        state.searchQuotes = [];
        state.authorQuotes = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default quoteSlice.reducer;
