import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import { getTaskAsync } from "../redux/reducers/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTaskAsync } from "../redux/reducers/taskSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const ShowTask = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskAsync());
  }, [dispatch]);

  const tasks = useSelector((state) => state.task);
  const allTask = tasks.task;
  console.log(allTask);

  const deleteHandler = async (id) => {
    console.log(id);

    try {
      console.log(id);
      const docRef = doc(db, "task", id);
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} deleted successfully.`);
      window.alert(`Document with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting document:", error);
      window.alert("Error deleting document:", error);
    }

    await deleteDoc(doc(db, "taskToDelete", id));
  };
  return (
    <>
      <div className="w-full max-w-[500px] h-full bg-slate-300 mt-40 p-8 ">
        {tasks.task.map((task) => (
          <div
            key={task.id}
            className="border relative bg-white border-gray-500 rounded-lg w-full h-[10rem] p-3 mb-4"
          >
            <p className="text-left">Title: {task.title}</p>
            <p className="text-left">Description: {task.description}</p>

            <div className="absolute bottom-0 pb-3">
              <Stack spacing={2} direction="row">
                <Button variant="contained">Edit</Button>
                <Button variant="contained">Completed</Button>
                <Button
                  onClick={() => {
                    deleteHandler(task.id);
                  }}
                  variant="contained"
                >
                  Delete
                </Button>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTask;
