import React, { useState } from "react";
import { passwordResetRequest } from "@/api/auth";

export const ForgotPassword = () => {
    const [email, setEmail] = useState(""); // ✅ collect email, not username
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await passwordResetRequest(email);
            // Show success message
            setMessage(
                res.data.message ||
                "If the account exists, a password reset link has been sent to your email."
            );
        } catch (err: any) {
            // Show backend error if available
            setMessage(
                err.response?.data?.error || "Something went wrong. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`p-2 rounded text-white ${
                        loading ? "bg-gray-400" : "bg-blue-500"
                    }`}
                >
                    {loading ? "Sending..." : "Request Reset"}
                </button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};
