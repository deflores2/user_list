import React from "react";
import DataTable from "./components/DataTable";
import { DialogPopup } from "./components/UserDialog";

const App: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center py-4">
        <h1 className="text-2xl font-bold max-w-sm">User Management</h1>
        <DialogPopup />
      </div>
      <DataTable />
    </div>
  );
};

export default App;
