import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./PersonInput.css";

function PersonInput() {
    const obj = {
        id: "",
        name: "",
        role: "",
        isSubmitted: false,
    };
    const dispatch = useDispatch();
    const [person, setPerson] = useState(obj);
    const expand = useSelector((state) => state.expand);
    const overlay = useSelector((state) => {
        return state.showOverlay;
    });
    const collapser = () => {
        dispatch({
            type: "COLLAPSE_PERSON_INPUT",
        });
    };
    const nameChangeHandler = (e) => {
        setPerson({ ...person, name: e.target.value });
    };
    const idChangeHandler = (e) => {
        setPerson({ ...person, id: e.target.value });
    };
    const roleChangeHandler = (e) => {
        setPerson({ ...person, role: e.target.value });
    };
    const submitHandler = (e) => {
        // e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:3001/employees",
            data: person,
        });
    };
    const buttonAdd = (
        <div className="bg-danger">
            <button className="btn btn-primary temp" onClick={collapser}>
                Add Employee
            </button>
        </div>
    );
    if (expand && !overlay) {
        return (
            <div className="modal-fade bg-danger pureRed" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                className="close"
                                id="close"
                                type="submit"
                                onClick={collapser}
                            >
                                x
                            </button>
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label>Employee Id:</label>
                                    <input
                                        id="inpfield"
                                        type="text"
                                        name="id"
                                        onChange={idChangeHandler}
                                        placeholder="Id"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Employee Name:</label>
                                    <input
                                        id="inpfield"
                                        type="text"
                                        name="name"
                                        onChange={nameChangeHandler}
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Employee Role:</label>
                                    <input
                                        id="inpfield"
                                        type="text"
                                        name="role"
                                        onChange={roleChangeHandler}
                                        placeholder="Role"
                                    />
                                </div>
                                <button
                                    className="btn btn-primary"
                                    id="pos"
                                    type="submit"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        if (!overlay) return buttonAdd;
    }
    return buttonAdd;
}
export default PersonInput;
