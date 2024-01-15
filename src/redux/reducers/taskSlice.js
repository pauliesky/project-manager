import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

export const addTaskAsync = createAsyncThunk(
  "task/addTask",
  async ({ title, description }) => {
    try {
      const docRef = await addDoc(collection(db, "task"), {
        title: title,
        description: description,
      });
      console.log("Document written with ID: ", docRef.id);
      // return docRef;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTaskAsync = createAsyncThunk("task/getTask", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "task"));
    const taskDataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return taskDataArray;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  loading: "idle",
  task: [],
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskSuccess: (state, action) => {
      (state.loading = "succeeded"),
        (state.task = action.payload),
        (state.error = null);
    },
    addTaskFailure: (state, action) => {
      (state.loading = "failed"),
        (state.task = action.payload),
        (state.error = null);
    },
    getTaskSuccess: (state, action) => {
      (state.loading = "succeeded"),
        (state.task = action.payload),
        (state.error = null);
    },
    getTaskFailure: (state, action) => {
      (state.loading = "failed"),
        (state.task = action.payload),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.task.push(action.payload);
      })
      .addCase(getTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.task = action.payload;
      });
  },
});

export const {
  addTaskSuccess,
  addTaskFailure,
  getTaskSuccess,
  getTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;
