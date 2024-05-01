import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
    return (
        <>
            <div className="flex items-center gap-3 group relative sm:sticky">

                <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-500 font-medium  bg-slate-100 ">
                    {getInitials(userInfo?.fullName)}
                </div>

                <div className="sm:flex sm:justify-center sm:items-center group-hover:block hidden sm:static absolute -right-1 bg-white p-1">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-lg font-medium">
                            {userInfo?.fullName}
                        </p>

                        <button
                            className="text-xs text-slate-50 rounded-xl bg-primary px-2 py-1 hover:bg-red-600"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;
