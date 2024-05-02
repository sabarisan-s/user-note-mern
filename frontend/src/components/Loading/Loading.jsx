import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className=" w-8 h-8 border-e-0 border-s-0 border-4 border-primary animate-spin rounded-full"></div>
            <p>
                Please wait <span className="animate-pulse">...</span>
            </p>
        </div>
    );
};

export default Loading;
