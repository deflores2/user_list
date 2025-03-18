import React, { useEffect, useState } from "react";
import { fetchUsers, User } from "../services/userService";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <ul className="mt-4">
      {users.map((user) => (
        <li key={user.id} className="p-2 border-b">
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
