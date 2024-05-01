import React, { useState } from "react";
import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({
    userInfo,
    onSearchNote,
    handleClearSearch,
    isUserLogin,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };
    const onCloseSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    return (
        <>
            <div className="bg-white flex items-center justify-between sm:px-6 py-2  drop-shadow px-2">
                <h2 className="sm:text-xl text-lg font-medium text-black py-2">Notes</h2>
                {isUserLogin && (
                    <>
                        <SearchBar
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            onCloseSearch={onCloseSearch}
                            handleSearch={handleSearch}
                        />
                        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
