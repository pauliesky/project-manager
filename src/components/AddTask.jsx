import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTask } from "../redux/reducers/taskSlice";

// import { addTodo } from 'redux/operations';

const InputForm = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value || "");
    console.log(inputValue);
  };

  const addTask = () => {
    if (inputValue.trim() === "") {
      return toast.error("The field cannot be empty.");
    }
    console.log(inputValue);

    const newTask = {
      title: inputValue.trim(),
      // completed: false,
    };

    dispatch(addTask(newTask));
    // toast.success('New task added.');
    // setInputValue('');
  };

  return (
    <>
      <div className="flex h-[40px] max-w-[500px] justify-between items-center w-full">
        <input
          className="h-full w-2/3 p-3 rounded-lg border border-cyan-500"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter task..."
        />
        <button
          className="h-full w-1/5 text-white rounded-lg bg-blue-700 border-none cursor-pointer"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default InputForm;
