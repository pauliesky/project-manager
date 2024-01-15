import AddTask from "../components/AddTask";
import ShowTask from "../components/showTask";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-5"> Task Manager</h1>
      <AddTask />
      <ShowTask />
    </div>
  );
};

export default Home;
