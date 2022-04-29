import React from 'react'
import { useState } from 'react'

const LoginForm = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    return (
        <div>
            <h3>Login</h3>

            <form>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>


                <input type="submit" value="Login" className="btn btn-secondary mt-3" />
            </form>
        </div>
    )
}

export default LoginForm