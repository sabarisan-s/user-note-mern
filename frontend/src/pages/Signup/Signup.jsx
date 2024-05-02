import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Loading from "../../components/Loading/Loading";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("please enter a name");
            return;
        }

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
            setIsLoading(true);
            const { data } = await axiosInstance.post("/create-account", {
                fullName: name,
                email,
                password,
            });

            if (data && data.error) {
                setError(data.message);
                return;
            }

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
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="sm:w-1/2 w-11/12 border rounded bg-white sm:py-10 sm:px-7 px-5 py-7">
                    <form onSubmit={handleSignup}>
                        <h4 className="text-2xl mb-7">Signup</h4>

                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        {!isLoading ? (
                            <button type="submit" className="btn-primary">
                                Create Account
                            </button>
                        ) : (
                            <Loading />
                        )}

                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-primary underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
