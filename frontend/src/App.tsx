import React from "react";
import DataTable from "./components/DataTable";
import { Button } from "./components/ui/button";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center py-4">
                <h1 className="text-2xl font-bold max-w-sm">User Management</h1>
                <Button className="ml-auto">Add New User</Button>
            </div>
            <DataTable />
        </div>
    );
};

export default App;
