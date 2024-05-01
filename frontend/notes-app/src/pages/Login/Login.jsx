import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("please enter a valid email");
            return;
        }

        if (!password) {
            setError("please enter a password");
            return;
        }

        setError(null);

        try {
            const { data } = await axiosInstance.post("/login", {
                email,
                password,
            });
  
            if (data && data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                
                navigate("/dashboard");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.Please try again");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="sm:w-1/2  w-10/12 border rounded bg-white sm:py-10 sm:px-7 px-5 py-7">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Login</h4>

                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && (
                            <p className="text-xs text-red-500 pb-1">{error}</p>
                        )}

                        <button type="submit" className="btn-primary">
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
                            Not Registered Yet?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-primary underline"
                            >
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
