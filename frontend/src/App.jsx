import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Guest from "./pages/Guest/Guest";

const routes = (
    <Router>
        <Routes>
            <Route path="/" exact element={<Guest />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
        </Routes>
    </Router>
);

const App = () => {
    return <>{routes}</>;
};

export default App;
