import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'




const About = (props) => {

    useEffect(() => {
        document.title = "NutritarianEats - About"
    }, [])

    return (
        <div className="container">
            <div className="container-xxl px-md-5 bg-white p-4">
                <div className="row featurette align-items-center ">
                    <div className="col-md-7 align-items-center">
                        <h1 className="mt-2">Nutritarianism</h1>
                        <h2 className="featurette-heading">
                            <span className="text-muted">Plant-based Diet</span></h2>
                        <p className="lead">This eating style focuses on the nutrient-rich foods that unleash the body’s tremendous ability to heal, achieve optimal weight, and slow the aging process. </p>
                    </div>
                    <div className="col-md-5">
                        <img src={require('../img/vegan.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette align-items-center">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">What is a Nutritarian? <span className="text-muted"></span></h2>
                        <p className="lead">A nutritarian is someone who maximizes as many micro-nutrients as possible per calorie in their daily diet.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={require('../img/nutrition.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette align-items-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Whole foods. <span className="text-muted">Natural foods.</span></h2>
                        <p className="lead">Enjoy whole foods that are not heavily processed. The majority of the nutritarian diet is made up of fresh and clean produce rather than food that comes out of a package.</p>
                    </div>
                    <div className="col-md-5">
                        <img src={require('../img/arrangement.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>
                <hr className="featurette-divider" />


                <div className="row featurette align-items-center">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Eat mostly plants. <span className="text-muted">Foods you'll enjoy.</span></h2>
                        <p className="lead">Only eat animal products in small amounts, if any, such as meat, fish, dairy, and eggs.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={require('../img/fruit3.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>

                <hr className="featurette-divider" />
                <div className="row featurette align-items-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Follow the GBOMBS. <span className="text-muted">Greens, Beans, Onions, Mushrooms, and Berries.</span></h2>
                        <p className="lead">G-BOMBS is an acronym for Greens, Beans, Onions, Mushrooms, Berries and Seeds. These are the most health-promoting, anti-cancer superfoods on the planet. Make sure that you include some or all of them in your diet every day.</p>
                    </div>
                    <div className="col-md-5">
                        <img src={require('../img/gbombs.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette align-items-center">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">No S. O. S. <span className="text-muted">Salt, Oil, Sugar</span></h2>
                        <p className="lead">We don’t add salt, oil, or sugar to our recipes or to our prepared food, because these ingredients have been shown to have a negative impact on our health. When we eat the whole nut over just the processed oil, we are eating the fiber and protective nutrients too!</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={require('../img/rainbow.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>

                <hr className="featurette-divider" />
                <div className="row featurette align-items-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Want to find out more? <span className="text-muted">Yeah, you do.</span></h2>
                        <p className="lead">Schedule your free consultation today.
                            Contact us now and you will receive a free beginners guide and a full week meal plan. Click below to get started. </p>
                        <Link to="/recipes/contact" className="btn btn primary btn-dark btn-lg px-4 me-md-2 mt-4">Contact Us</Link>
                    </div>

                    <div className="col-md-5">
                        <img src={require('../img/notepad.jpg')} alt="" width="500" height="500" className="featurette-image img-fluid mx-auto" />
                    </div>
                </div>

                <hr className="featurette-divider mb-5" />


                <footer className="d-flex align-items-center justify-content-between">
                    <div className="col-4 my-2">Build by: Jen E.</div>
                    <div className="">Source:
                        <a className="col-2" href="https://www.drfuhrman.com/blog/210/beginners-guide"> https://www.drfuhrman.com/blog/210/beginners-guide</a>
                    </div>
                </footer>
            </div>
        </div>

    )
}

export default About;