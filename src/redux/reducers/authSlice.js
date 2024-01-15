import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
// import auth from "firebase/auth";
import auth from "../../firebase.config";
// import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


export const signUpAsync = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const accessToken = userCredential.user.accessToken;
      localStorage.setItem("Access Token", accessToken);

      window.alert("Account succesfully created");
      return userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Email already in-use, kindly use another email");
      throw new Error(`${errorCode}: ${errorMessage}`);
    }
  }
);

export const loginInAsync = createAsyncThunk(
  "auth/loginIn",
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user.reloadUserInfo.localId;
      // let authToken = localStorage.getItem("Auth Token");


      // if ("AuthToken" === authToken) {
      //   const navigate = useNavigate();

      //   navigate("/home");
      // }
     
      window.alert("Welcome");

   
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorCode, errorMessage);
      throw new Error(`${errorCode}: ${errorMessage}`);
    }
  }
);

const initialState = {
  loading: "idle",
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpSuccess: (state, action) => {
      (state.loading = "succeeded"),
        (state.user = action.payload),
        (state.error = null);
    },
    signUpFailure: (state, action) => {
      (state.loading = "failed"),
        (state.user = null),
        (state.error = action.payload);
    },
    loginInSuccess: (state, action) => {
      (state.loading = "success"),
        (state.user = action.payload),
        (state.error = null);
    },
    loginInFailure: (state, action) => {
      (state.loading = "failed"),
        (state.user = null),
        (state.error = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAsync.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(signUpAsync.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
    builder.addCase(loginInAsync.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(loginInAsync.fulfilled, (state, action) => {
      state.loading = "success";
      state.user = action.payload;
    });
    builder.addCase(loginInAsync.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { signUpSuccess, signUpFailure, loginInSuccess, loginInFailure } =
  authSlice.actions;

export default authSlice.reducer;
