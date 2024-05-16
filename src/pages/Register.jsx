import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                name: data.name,
                email: data.email,
                password: data.password
            });
            toast.success("User registered successfully!");
            setData({ name: '', email: '', password: '' });
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Error registering user. Please try again.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        placeholder='Enter your Name'
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        placeholder='Enter your Email'
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        placeholder='Enter your Password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}
