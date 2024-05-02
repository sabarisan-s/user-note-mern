import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Guest = () => {
    return (
        <div className="">
            <Navbar />
            <div className="flex flex-col justify-center items-center">

            <img
                src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?t=st=1714626560~exp=1714630160~hmac=17cf0d19e8839cd2a7e312bf17e79ebceb5d2489b9cce89ee346faf3c56e1bec&w=826"
                alt=""
                className="w-10/12 sm:w-1/2 lg:w-1/3 mx-auto   my-16 sm:my-0"
            />

            <p className="text-center mx-auto animate-bounce ">
                Guest page soon ready! Please experience as User (register/login) page... 
            </p>
            </div>
        </div>
    );
};

export default Guest;
