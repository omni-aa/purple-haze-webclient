import { getMe } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface User {
    username: string;
}

export const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await getMe(token);
                setUser(res.data.user);

            } catch {
                navigate("/signin");
            }
        };

        fetchUser();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {user && <p>Welcome, <strong>{user.username}</strong></p>}
            <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded">
                Logout
            </button>
        </div>
    );
};
