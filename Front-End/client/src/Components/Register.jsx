import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e, field) => {
        setRegisterUser({ ...registerUser, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("button clicked")
        try {
            const response = await axios.post('http://localhost:3001/admin/register', {
                username: registerUser.username,
                email: registerUser.email,
                password: registerUser.password
            });
            console.log("Response:", response);
            if (response.status === 200) {
                console.log('Registration successful');
                window.alert('Registration successful');
            } else if (response.status === 409) {
                console.error('User already exists');
                window.alert('User already exists');
            } else {
                console.error('Unexpected response status:', response.status);
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('An error occurred while registering', error);
        }
    };
    
    return (
        <>
         <h2 className='text-2xl mt-3'>Register</h2>
        <div className="container mx-auto">
           
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700 mt-3">Username:</label>
                    <input className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={registerUser.username} onChange={(e) => handleChange(e, "username")} />
                </div>
                <div>
                    <label className="block text-gray-700 mt-3">Email:</label>
                    <input className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" value={registerUser.email} onChange={(e) => handleChange(e, "email")} />
                </div>
                <div>
                    <label className="block text-gray-700 mt-3">Password:</label>
                    <input className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" value={registerUser.password} onChange={(e) => handleChange(e, "password")} />
                </div>
                <div className='mt-4'>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Register</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default Register;
