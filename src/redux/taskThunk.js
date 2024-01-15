// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "https://todo-backend-vercel-woad.vercel.app/";

// // export const fetchTask = createAsyncThunk("task/fetchTask", async () => {
// //   try {
// //     const response = await axios.get("/todos");
// //     return response.data;
// //   } catch (error) {
// //     const errorCode = error.code;
// //     const errorMessage = error.message;
// //     throw new Error(`${errorCode}: ${errorMessage}`);
// //   }
// // });

// export const addTodo = createAsyncThunk(
//   "todos/addTodo",
//   async (todo, thunkAPI) => {
//     try {
//       const response = await axios.post("/todos", todo);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
