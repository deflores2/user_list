import React from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
