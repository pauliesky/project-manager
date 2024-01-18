import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

import { db } from "../../firebase.config";

export const addTaskAsync = createAsyncThunk(
  "task/addTask",
  async ({ title, description }) => {
    try {
      const docRef = await addDoc(collection(db, "task"), {
        title: title,
        description: description,
      });

      window.alert("Your task has been successfully added  ", docRef.id);
    } catch (error) {
      window.alert(error);
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
    window.alert(error);
  }
});

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (id) => {
    try {
      const docRef = doc(db, "task", id);
      await deleteDoc(docRef);

      window.alert(`Task with ID ${id} deleted successfully.`);
    } catch (error) {
      window.alert("Error deleting document:", error);
    }

    await deleteDoc(doc(db, "taskToDelete", id));
  }
);

export const editTaskAsync = createAsyncThunk(
  "task/editTask",
  async ({ id, updatedTitle, updatedDescription }) => {
    try {
      await setDoc(doc(db, "task", id), {
        title: updatedTitle,
        description: updatedDescription,
      });

      window.alert(`Task edited successfully.`);
      // return { id, updatedTitle, updatedDescription };
    } catch (error) {
      window.alert("Error editing document:", error);
      throw error;
    }
  }
);

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
    deleteTaskSuccess: (state, action) => {
      (state.loading = "succeeded"),
        (state.task = action.payload),
        (state.error = null);
    },
    deleteTaskFailure: (state, action) => {
      (state.loading = "failed"),
        (state.task = action.payload),
        (state.error = null);
    },
    editTaskSuccess: (state, action) => {
      (state.loading = "succeeded"),
        (state.task = action.payload),
        (state.error = null);
    },
    editTaskFailure: (state, action) => {
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
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.task = action.payload;
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
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
  deleteTaskSuccess,
  deleteTaskFailure,
  editTaskFailure,
  editTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;
