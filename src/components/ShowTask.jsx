import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
// import { getTaskAsync } from "../redux/reducers/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTaskAsync } from "../redux/reducers/taskSlice";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebase.config";
import { deleteTaskAsync } from "../redux/reducers/taskSlice";
import { editTaskAsync } from "../redux/reducers/taskSlice";

const ShowTask = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskAsync());
  }, [dispatch]);

  const tasks = useSelector((state) => state.task);

  const deleteHandler = async (id) => {
 
    dispatch(deleteTaskAsync(id));
  };

  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const editHandler = (task) => {
    setEditingId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const saveEditHandler = async (id) => {
    dispatch(editTaskAsync({id, updatedTitle, updatedDescription}));
    // setEditingId(null);
    // await setDoc(doc(db, "task", id), {
    //   title: updatedTitle,
    //   description: updatedDescription,
    // });
    console.log(updatedTitle, updatedDescription);
  };

  return (
    // <>
    //   <div className="w-full max-w-[500px] h-full bg-slate-300 mt-40 p-8 ">
    //     {tasks.task.map((task) => (
    //       <div
    //         key={task.id}
    //         className="border relative bg-white border-gray-500 rounded-lg w-full h-[10rem] p-3 mb-4"
    //       >
    //         <p className="text-left">Title: {task.title}</p>
    //         <p className="text-left">Description: {task.description}</p>

    //         <div className="absolute bottom-0 pb-3">
    //           <Stack spacing={2} direction="row">
    //             <Button variant="contained">Edit</Button>
    //             <Button
    //               onClick={() => {
    //                 deleteHandler(task.id);
    //               }}
    //               variant="contained"
    //             >
    //               Delete
    //             </Button>
    //           </Stack>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </>

    <>
      <div className="w-full max-w-[500px] h-full bg-slate-300 mt-40 p-8 ">
        {tasks.task.map((task) => (
          <div
            key={task.id}
            className="border relative bg-white border-gray-500 rounded-lg w-full h-[15rem] p-3 mb-4"
          >
            {editingId === task.id ? (
              <div className="flex flex-col gap-4">
                <TextField
                  label="Updated Title"
                  variant="outlined"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <TextField
                  label="Updated Description"
                  variant="outlined"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <Button
                  onClick={() => saveEditHandler(task.id)}
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-left">Title: {task.title}</p>
                <p className="text-left">Description: {task.description}</p>
                <div className="absolute bottom-0 pb-3">
                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={() => editHandler(task)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteHandler(task.id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </Stack>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTask;
