import type { IUser, IUserDetails } from "../pages/constants/dashboard.dto";

const API_URL = "https://api.json-generator.com/templates/XoZrTJuHcdGw/data";
const API_TOKEN = "vl9hbz42z261a92ki6dqlh9qqclqyeo2yq7qpnl4";

export const fetchUsers = async (): Promise<IUser[]> => {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return response.json();
};

export const fetchUsersById = async (id: number): Promise<IUserDetails> => {
    const response = await fetch(
        `https://api.json-generator.com/templates/9XYyyrmPXft6/data`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status}`);
    }
    const users: IUserDetails[] = await response.json();
    const user = users?.find((u) => u?.id === id);

    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return user;
};
