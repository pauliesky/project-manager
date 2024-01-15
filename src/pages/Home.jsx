import AddTask from "../components/AddTask";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-5"> Task Manager</h1>
      <AddTask />
    </div>
  );
};

export default Home;
