//Component to display the Contact Form 
//Uses useState for each form field

import { useState } from 'react';
import './Contact.css';

function Contact() {

    //Using useState to manage the form data  
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', queryType: '', message: '' });

    //State to track whether the form was successfully submitted
    const [submitted, setSubmitted] = useState(false);

    //Creating a callback function to handle the input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Creating a function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); //To prevent the default behaviour(page reload)
        //Show the success confirmation message
        setSubmitted(true);
        //reset the form fields
        setFormData({ name: '', email: '', phone: '', queryType: '', message: '' });
    };
    return (
        <div className='contact-page'>
            <div className='contact-page-header'>
                <h1>Contact Us</h1>
                <p>Please leave us a message, if you have any question or want to place a custom order!</p>
            </div>
            <div className='contact-page-layout'>
                {/* Form */}
                <div className='contact-form-wrapper'>
                    <h2 className='contact-form-title'>Submit a Request</h2>
                    {/* Conditional rendering: display success message OR the form */}
                    {submitted ? (
                        <div className='contact-success'>
                            <h3>✅Message Sent!</h3>
                            <p>Thank you for reaching out. We will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='contact-form'>

                            <div className='form-field'>
                                <label>Name:</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder='Enter Your Full Name' required />
                            </div>
                            <div className='form-field'>
                                <label>Email:</label>
                                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='xyz@gmail.com' required />
                            </div>
                            <div className='form-field'>
                                <label>Phone:</label>
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder='+1(444)555-0000' />
                            </div>
                            <div className='form-field'>
                                <label>Query Type:</label>
                                <select id="queryType" name="queryType" value={formData.queryType} onChange={handleChange} required>
                                    <option value="">Select a query type</option>
                                    <option value="order">Place a custom order</option>
                                    <option value="inquiry">Order Inquiry</option>
                                    <option value="dietary">Dietary Questions</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className='form-field'>
                                <label>Message:</label>
                                <textarea id="message" name="message" value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here!!!!!"
                                    rows={5}
                                    required />
                            </div>
                            <button type="submit" className='form-submit-btn'>Submit</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Contact;
