import { useState } from "react";
import { useDispatch } from "react-redux";
// import { collection, getDocs } from "firebase/firestore";

// import { db } from "../firebase.config";

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

  // async () => {
  //   const querySnapshot = await getDocs(collection(db, "task"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };

  const addTaskHandler = async () => {
    // try {
    //   const querySnapshot = await getDocs(collection(db, "task"));
    //   // const taskDataArray = [];

    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, doc.data());
    //     // taskDataArray.push({ data: doc.data(), id: doc.id });
    //     // console.log(taskDataArray)
    //   });
    // } catch (error) {
    //   window.alert(error);
    // }

    dispatch(addTaskAsync({ title, description }));
  };

  // useEffect(() => {
  //   addTaskHandler();
  // });

  // const disabledHandler = () => {
  //   return title.trim() === '' || description.trim() === '' 

  // };

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
          // disabled={disabledHandler}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default InputForm;
