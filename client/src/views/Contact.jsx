import React from 'react'
import '../App.css'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

function Contact() {

    const [status, setStatus] = useState("Submit");
    const history = useHistory();
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        axios.post("http://localhost:8000/api/recipes/contact", form)
            .then(res => {
                console.log(res);
                history.push("/recipes/contact")
                setSuccess(true)
                setStatus("Submit");

            })
            .catch(err => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors)
            });

    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };


    useEffect(() => {
        document.title = "NutritarianEats - Contact"
    }, [])


    return (
        <div className="container">
            <div className="container-xxl px-md-5 bg-white p-4">
                <div className="row justify-content-center">
                    <section className="mb-4 col-8">
                        <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                        <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                            a matter of hours to help you.</p>
                        <div className="row justify-content-center">
                            <div className="col-md-9 mb-md-0 mb-5">

                                {/* FORM START */}

                                {success && <div className="col-9 alert alert-success" role="alert">
                                    Message successfully submitted.
                                </div>}

                                <form name="contact-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="md-form mb-0">
                                                <label htmlFor="name" className="">Your name</label>
                                                <input type="text" id="name" name="name" className="form-control" onChange={onChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="md-form mb-0">
                                                <label htmlFor="email" className="">Your email</label>
                                                <input type="text" id="email" name="email" className="form-control" onChange={onChangeHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="subject" className="">Subject</label>
                                                <input type="text" id="subject" name="subject" className="form-control" onChange={onChangeHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form">
                                                <label htmlFor="message">Your message</label>

                                                <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea" onChange={onChangeHandler}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-md-left">
                                        <button type="submit">{status}</button>
                                    </div>
                                </form>
                                {/* FORM END */}


                            </div>
                        </div>
                    </section>
                </div>
                <hr className="featurette-divider my-5  " />

                <footer className="">

                    <div className="">Build by: Jen E.</div>
                </footer>
            </div>
        </div>


    )
}

export default Contact