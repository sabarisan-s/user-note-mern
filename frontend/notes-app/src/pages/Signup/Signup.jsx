import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignup = (e) => {
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
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center mt-28">
                <div className="w-95 border rounded bg-white py-10 px-7">
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

                        <button type="submit" className="btn-primary">
                            Create Account
                        </button>

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
