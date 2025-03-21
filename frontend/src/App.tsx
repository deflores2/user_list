import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import { DialogPopup } from "./components/DialogPopup";
import { User } from "./types";
import { fetchUsers } from "./services/userService";

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const handleUserUpdated = (updatedUser: User) => {
        setUsers((prevUsers) => {
            if (prevUsers.some((user) => user.id === updatedUser.id)) {
                return prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user));
            } else {
                return [...prevUsers, updatedUser];
            }
        });
    };
    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        getUsers();
    }, []);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center py-4">
                <h1 className="text-2xl font-bold max-w-sm">User Management</h1>
                <DialogPopup onUserUpdated={handleUserUpdated} userToEdit={null} onClose={() => {}} />
            </div>
            <DataTable users={users} setUsers={setUsers} />
        </div>
    );
};

export default App;
