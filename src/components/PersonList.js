import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import "./PersonList.css";
function PersonList() {
    const [persons, setPerson] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Banging Server left and right");
        axios.get("http://localhost:3001/employees").then((res) => {
            setPerson(res.data);
        });
    }, []);
    const overlay = useSelector((state) => state.showOverlay);
    const updHandler = (person, act) => {
        if (act === "OVERLAY_TOGGLE")
            dispatch({
                type: act,
                payload_id: person.id,
            });
        if (act === "DELETE") {
            console.log(person);
            axios.delete("http://localhost:3001/employees/" + person.id);
            window.location.reload(true);
        }
    };
    if (overlay) {
        return <UpdateForm />;
    }
    return (
        <div>
            <table className="table cust-z">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((person) => (
                        <tr key={person.id}>
                            <th scope="row">{person.id}</th>
                            <td>{person.name}</td>
                            <td>{person.role}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        updHandler(person, "OVERLAY_TOGGLE");
                                    }}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        updHandler(person, "DELETE");
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PersonList;
