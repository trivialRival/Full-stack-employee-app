import React from "react";
import "./UpdateForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
export default function UpdateForm() {
    const id = useSelector((state) => state.id_sent);
    const dispatch = useDispatch();
    const [emp, setEmp] = useState({ name: "", role: "" });
    // console.log(id);
    const nameHandler = (e) => {
        setEmp({ ...emp, name: e.target.value });
    };
    const roleHandler = (e) => {
        setEmp({ ...emp, role: e.target.value });
    };
    const updateEmp = () => {
        console.log(emp);
        axios
            .put("http://localhost:3001/employees", { id: id, ...emp })
            .then((response) => console.log(response));
    };
    const toggleView = () => {
        dispatch({ type: "TOGGLE" });
    };
    const label_this = (typ) => {
        return (
            <div>
                <label>{typ}</label>
                <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder={"Enter New " + typ}
                    onChange={typ === "Name" ? nameHandler : roleHandler}
                ></input>
            </div>
        );
    };
    return (
        <div className="modal-fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            className="close"
                            id="close"
                            type="submit"
                            onClick={toggleView}
                        >
                            x
                        </button>
                        <form>
                            {label_this("Name")}
                            {label_this("Role")}
                            <button
                                type="submit"
                                className="btn btn-success"
                                id="pos"
                                onClick={(e) => {
                                    updateEmp({ id });
                                }}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
