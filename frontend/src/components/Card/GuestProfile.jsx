import React from "react";
import { Link } from "react-router-dom";

const GuestProfile = () => {
    return (
        <div>
            <div className="flex items-center gap-3">
                <div className="flex justify-center items-center   ">
                    <Link
                        to="/signup"
                        className="text-xs text-slate-50  hover:bg-primary bg-slate-500 p-3 border-slate-500 hover:border-e hover:border-white border-e rounded-s-2xl"
                    >
                        SignUp
                    </Link>

                    <Link
                        to="/login"
                        className="text-xs text-slate-50  hover:bg-primary bg-slate-500 p-3  border-slate-500 hover:border-s hover:border-white border-s   rounded-e-2xl"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GuestProfile;
