import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [formErrors, setFormErrors] = useState("");
    const history = useHistory();

    const onSubmitHandler = (e) => {
        console.log("this worked")
        e.preventDefault();
        let form = { email, password };
        axios.post("http://localhost:8000/api/users/login", form, { withCredentials: true })
            .then(res => {
                console.log('response when logging in! ', res)
                if (res.data.error) {
                    setFormErrors(res.data.error)
                } else {
                    history.push("/dashboard")
                }
            })
            .catch(err => console.log('error when logging in: ', err))


    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <p className="text-danger">{formErrors}</p>
                <input type="submit" value="Login" className="btn btn-secondary mt-3" />
            </form>
        </div>
    )
}

export default LoginForm