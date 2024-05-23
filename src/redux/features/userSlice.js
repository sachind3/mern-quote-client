import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../../utils";

const initialState = {
  user: null,
  token: null,
  isLogin: false,
  isLoading: false,
  error: null,
};

export const actionRegister = createAsyncThunk(
  "user/actionRegister",
  async (data, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.post("/user/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionLogin = createAsyncThunk(
  "user/actionLogin",
  async (data, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.post("/user/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionForgotPassword = createAsyncThunk(
  "user/actionForgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.post("/user/forgotPassword", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionResetPassword = createAsyncThunk(
  "user/actionResetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      console.log(token, password);
      const API = getAPI(token);
      const response = await API.post("/user/resetPassword", {
        password: password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionRefreshToken = createAsyncThunk(
  "user/actionRefreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.post("/user/refresh_token");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionGetUserInfo = createAsyncThunk(
  "user/actionGetUserInfo",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.token;
      const API = getAPI(token);
      const response = await API.get("/user/getUserInfo");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const actionLogout = createAsyncThunk(
  "user/actionLogout",
  async (_, { rejectWithValue }) => {
    try {
      const API = getAPI();
      const response = await API.get("/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStates: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actionRegister.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(actionRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        localStorage.setItem("firstLogin", true);
      })
      .addCase(actionLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionRefreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actionRefreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.result.access_token;
      })
      .addCase(actionRefreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionGetUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actionGetUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.result;
      })
      .addCase(actionGetUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(actionLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actionLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.removeItem("firstLogin");
        state.user = null;
        state.token = null;
        state.isLogin = false;
      })
      .addCase(actionLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearStates } = userSlice.actions;

export default userSlice.reducer;
