import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); 

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: data.email,
                password: data.password
            });
            
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            toast.success('Login successful');
            console.log(response.data);
            navigate('/secondpage');
        } catch (error) {
            toast.error('Error logging in');
            console.error('Error logging in:', error);
        }
    };

    // // Register user function
    // const registerUser = async () => {
    //     try {
    //         // Make a registration request without interceptors
    //         const response = await axios.post('http://localhost:3000/register', {
    //             email: data.email,
    //             password: data.password
    //         });
    //         // Handle registration success
    //         toast.success('Registration successful');
    //         console.log(response.data);
    //     } catch (error) {
    //         // Handle registration failure
    //         toast.error('Error registering user');
    //         console.error('Error registering user:', error);
    //     }
    // };

    return (
        <div>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input 
                    type='text' 
                    placeholder='Enter your Email' 
                    value={data.email} 
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <label>Password</label>
                <input 
                    type='password' 
                    placeholder='Enter your Password' 
                    value={data.password} 
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <button type='submit'>Login</button>
                {/* <button type='button' onClick={registerUser}>Register</button> */}
            </form>
        </div>
    );
}
