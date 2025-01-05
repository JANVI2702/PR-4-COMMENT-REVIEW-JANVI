import React, { useState, useEffect, useRef } from 'react';
import { IoStar } from "react-icons/io5";
import AOS from "aos";
import 'aos/dist/aos.css';

function Feedback() {
    const [feedback, setFeedback] = useState({});
    const [rating, setRating] = useState(null);
    const [submittedFeedback, setSubmittedFeedback] = useState([]);

    const reviewsSectionRef = useRef(null);

    useEffect(() => {
        const data = localStorage.getItem('feedback');
        if (data) {
            setSubmittedFeedback(JSON.parse(data));
        }
        AOS.init();
    }, []);

    const handlechange = (e) => {
        let { name, value } = e.target;
        if (rating !== null) {
            return setFeedback({ ...feedback, [name]: value, ['rating']: rating });
        }
        setFeedback({ ...feedback, [name]: value });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!rating) {
            alert('Please provide a rating before submitting feedback.');
            return;
        }
        console.log(feedback);

        setSubmittedFeedback([...submittedFeedback, feedback]);
        localStorage.setItem('feedback', JSON.stringify([...submittedFeedback, feedback]));
        setRating(null);
        setFeedback({});


        reviewsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handlerating = (rating) => {
        setRating(rating + 1);
    };

    return (
        <>
            <body data-bs-spy="scroll" data-bs-target="#navbar">
                <section>
                    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                        <div className="container flex-lg-column">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#click">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="click">
                                <ul className="navbar-nav ms-auto flex-lg-column text-lg-center">
                                    <li className="nav-item">
                                        <a className="nav-link fw-bold text-uppercase" href="#">feedback</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="d-flex justify-content-center align-items-center vh-100 content" id='#'>
                        <form className="w-50 mx-auto" onSubmit={handlesubmit}>
                            <div className="card text-start shadow-lg p-4 bg-dark rounded" data-aos="fade-left"
                                data-aos-anchor="#example-anchor"
                                data-aos-offset="200"
                                data-aos-duration="1000">
                                <div>
                                    <h2 className='card-title  fw-light text-white'>Feedback</h2>
                                    <p className=' font-size text-gray'>Your feedback is valuable for us, feel free share</p>
                                </div>
                                <div className="card-body p-0">
                                    <div className="mt-2">
                                        <h6 className='text-gray'>Your Email</h6>
                                        <div className="input-group mb-3">
                                            <input type="email" name='email' value={feedback.email || ''} onChange={handlechange} className="form-control  bg-gray border-black text-light" aria-label="Username" aria-describedby="basic-addon1" placeholder='enter email' />
                                        </div>

                                        <div>
                                            <p className=' text-gray fs-6 m-0 rating'>Your Rating</p>
                                            {[...Array(5)].map((_, index) => (
                                                <IoStar
                                                    key={index}
                                                    onClick={() => handlerating(index)}
                                                    className={`fs-3 mx-1 mb-4  ${rating >= index + 1 ? 'text-warning' : 'text-gray'}`}
                                                />
                                            ))}
                                        </div>
                                        <textarea
                                            className="form-control  bg-gray  text-light border-black "
                                            id="feedback"
                                            name="feedback"
                                            onChange={handlechange}
                                            placeholder="Tell us more..."
                                            value={feedback.feedback || ''}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn bg-gray text-light mt-3">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <section id='reviews' ref={reviewsSectionRef}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="w-50 mx-auto" >
                            <h1>Reviews</h1>
                            {submittedFeedback.map((item, index) => (
                                <div key={index} className="card text-start shadow-lg p-4 bg-dark rounded mb-3" data-aos="fade-up"
                                    data-aos-duration="1000">
                                    <div>
                                        <h6 className='text-gray'>From: {item.email}</h6>
                                        <p className='bg-dark'>{[...Array(item.rating)].map((_, i) => (
                                            <IoStar key={i} className="text-warning bg-dark fs-3 mx-1" />
                                        ))}
                                            {[...Array(5 - item.rating)].map((_, i) => (
                                                <IoStar key={i} className="text-muted fs-3 mx-1" />
                                            ))}</p>
                                    </div>
                                    <div className="card-body p-0">
                                        <p className='bg-dark text-light'>{item.feedback}</p>
                                    </div>
                                </div>
                            ))}
                            {submittedFeedback.length === 0 && (
                                <div className="card text-start shadow-lg p-4 bg-dark rounded">
                                    <p className='bg-dark text-light'>No reviews yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </body>
        </>
    );
}

export default Feedback;