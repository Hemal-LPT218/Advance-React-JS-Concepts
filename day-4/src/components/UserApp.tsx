import { memo } from "react";
import UserTable from "./UserTable";
import UserDialog from "./UserDialog";

const UserApp = memo(() => {
  return (
    <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-lime-100">
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-bold text-sky-700">User List</h1>
        <UserDialog />
      </div>
      <UserTable />
    </div>
  );
});

export default UserApp;
