import React, { useState } from "react";
import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/login");
    };
    const handleSearch = () => {
        return;
    };
    const onCloseSearch = () => {
       setSearchQuery("")
    };

    return (
        <>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <h2 className="text-xl font-medium text-black py-2">Notes</h2>
                <SearchBar
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    onCloseSearch={onCloseSearch}
                    handleSearch={handleSearch}
                />

                <ProfileInfo onLogout={onLogout} />
            </div>
        </>
    );
};

export default Navbar;
