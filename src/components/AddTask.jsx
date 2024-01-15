import { useState } from "react";
import { useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase.config";

import { addTaskAsync } from "../redux/reducers/taskSlice";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  async () => {
    const querySnapshot = await getDocs(collection(db, "task"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const addTaskHandler = async () => {
    // try {
    //   const querySnapshot = await getDocs(collection(db, "task"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    dispatch(addTaskAsync(title, description));
    console.log(title, description);
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-[40px] max-w-[500px] justify-between items-center w-full">
        <input
          className="h-full w-2/3 p-3 rounded-lg border border-cyan-500"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter task..."
        />
        <input
          className="h-full w-2/3 p-3 rounded-lg border border-cyan-500"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description..."
        />
        <button
          className="h-full w-1/5 text-white rounded-lg bg-blue-700 border-none cursor-pointer"
          onClick={addTaskHandler}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default InputForm;
