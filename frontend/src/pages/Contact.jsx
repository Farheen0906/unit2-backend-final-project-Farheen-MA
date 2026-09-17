import { useState } from 'react';
import './Contact.css';

function Contact() {

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactPayload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        };

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactPayload)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error');
            }

            setErrorMessage('');
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.log('Something went wrong submitting the contact form:', error);
            setErrorMessage('Something went wrong sending your message. Please try again.');
        }
    };

    return (
        <div className='contact-page'>
            <div className='contact-page-header'>
                <h1>Contact Us</h1>
                <p>Please leave us a message, if you have any question or want to place a custom order!</p>
            </div>
            <div className='contact-page-layout'>
                <div className='contact-form-wrapper'>
                    <h2 className='contact-form-title'>Submit a Request</h2>
                    {submitted ? (
                        <div className='contact-success'>
                            <h3>✅Message Sent!</h3>
                            <p>Thank you for reaching out. We will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='contact-form'>

                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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