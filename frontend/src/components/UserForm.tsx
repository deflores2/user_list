import React, { useState } from "react";
import  { createUser } from "../services/userService";

const UserForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createUser(name, email);
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
            <input className="p-2 border" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="p-2 border ml-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="bg-blue-500 text-white p-2 ml-2" type="submit">Create User</button>
        </form>
    );
};

export default UserForm