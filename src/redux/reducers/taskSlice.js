import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { db } from "../../firebase.config";
// import { collection, getDocs } from "firebase/firestore";

axios.defaults.baseURL = "https://todo-backend-vercel-woad.vercel.app/";

const initialState = {
  loading: "idle",
  task: [],
  error: null,
};

const fetchTask = createAsyncThunk("task/fetchTask", async () => {
  try {
    const response = await axios.get("/todos");
    return response.data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
});

export const addTask = createAsyncThunk("task/addTask", async (todo) => {
  try {
    const response = await axios.post("/todos", todo);
    return response.data;
  } catch (error) {
    //   return thunkAPI.rejectWithValue(error.message);
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode}: ${errorMessage}`);
  }
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskSuccess: (state, action) => {
      (state.loading = "succeeded"),
        (state.user = action.payload),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = "failed";
        state.task = [];
        state.error = action.error;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.task.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
