import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
    return (
        <>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-500 font-medium bg-slate-100 group">
                    {getInitials("dsadsa")}
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-lg font-medium">{}fdsfds</p>

                    <button
                        className="text-xs text-slate-50 rounded-xl bg-primary px-2 py-1 hover:bg-red-600"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;
