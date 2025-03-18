export interface User {
    id: number;
    name: string;
    email: string;
}

const API_URL = "http://localhost:8000/users";

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createUser(name: string, email: string): Promise<User> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
    });
    return response.json();
}