import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ShowTask = () => {
  return (
    <>
      <div className="w-full h-screen bg-slate-300 mt-40 p-8 ">
        <div className="border  relative bg-white  border-gray-500 rounded-lg w-full h-[10rem] p-3">
          <p className="text-left">Title:</p>
          <p className="text-left">Description:</p>

          <div className="absolute bottom-0 pb-3">
            <Stack spacing={2} direction="row">
              <Button variant="contained">Edit</Button>
              <Button variant="contained">Completed</Button>
              <Button variant="contained">Delete</Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowTask;
