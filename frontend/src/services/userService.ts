import { User } from "@/types";

const API_URL = "http://localhost:8000";

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
}

export async function createUser(name: string, email: string): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
    });
    return response.json();
}

export const deleteUser = async (userId: number) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
    return await response.json();
};

export const updateUser = async (id: number, name: string, email: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};
