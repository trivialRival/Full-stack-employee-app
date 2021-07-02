import "./App.css";
import React, { Component } from "react";
import PersonList from "./components/PersonList";
import PersonInput from "./components/PersonInput";
import { useSelector, useDispatch } from "react-redux";

function App() {
    const overlay = useSelector((state) => state.showOverlay);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-danger">
                <h1 className="display-4 text-light">Employee Manager</h1>
            </nav>
            {!overlay && <PersonInput />}
            <PersonList />
        </div>
    );
}

export default App;
