import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import { getTaskAsync } from "../redux/reducers/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTaskAsync } from "../redux/reducers/taskSlice";

const ShowTask = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskAsync());
  }, [dispatch]);

  const tasks = useSelector((state) => state.task);

  console.log(tasks.task);
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
                <Button variant="contained">Delete</Button>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTask;
