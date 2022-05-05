import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'


const RegistrationForm = () => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPasswrod] = useState("");
    let [formErrors, setFormErrors] = useState({})
    const history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("this worked")
        let form = { firstName, lastName, email, password, confirmPassword }
        axios.post("http://localhost:8000/api/users/register", form, { withCredentials: true })
            .then(res => {
                console.log("res after register: ", res)
                if (res.data.errors) {
                    setFormErrors(res.data.errors);
                } else {
                    history.push("/dashboard")
                }
            })
            .catch(err => {
                console.log("error after register: ", err)
            })
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={onSubmitHandler}>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                    <p className="text-danger">{formErrors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                    <p className="text-danger">{formErrors.lastName?.message}</p>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    <p className="text-danger">{formErrors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-danger">{formErrors.password?.message}</p>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" className="form-control" onChange={(e) => setConfirmPasswrod(e.target.value)} />
                    <p className="text-danger">{formErrors.confirmPassword?.message}</p>
                </div>
                <input type="submit" value="Register" className="btn btn-secondary mt-3" />
            </form>
        </div>
    )
}

export default RegistrationForm;