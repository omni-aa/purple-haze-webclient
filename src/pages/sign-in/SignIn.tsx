import * as React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "@/api/auth";
import { ROUTE_PATHS } from "@/routes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogIn } from "lucide-react";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signin(email, password);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);

            navigate(ROUTE_PATHS.APP.DASHBOARD || "/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.error || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <LogIn className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to continue to your dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to={ROUTE_PATHS.AUTH.FORGOT_PASSWORD || "/forgot-password"}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            Don’t have an account?{" "}
                            <Link
                                to={ROUTE_PATHS.AUTH.SIGN_UP || "/signup"}
                                className="text-primary hover:underline"
                            >
                                Sign up
                            </Link>
                        </div>

                        <div className="text-center">
                            <Link
                                to={ROUTE_PATHS.PUBLIC.MAINPAGE || "/"}
                                className="text-sm text-muted-foreground hover:underline"
                            >
                                ← Back to home
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
