import React, { useState } from 'react';
import BahaLogo from '../images/image.jpg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function LoginForm() {
    const [data, setData] = useState({
        user: {
            email: '',
            password: '',
            user_type: 'customer'
        }
    })
    const [success, setSuccess] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        setData({ user: { ...data.user, [e.target.name]: e.target.value } })

    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!data.user.email) {
            setEmailError('Please enter your email address');
            return;
        } else {
            setEmailError('');
        }

        if (!data.user.password) {
            setPasswordError('Please enter your password');
            return;
        } else {
            setPasswordError('');
        }
        try {
            const response = await fetch('https://api.baha.co.in/api/v1/users/login', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            console.log("res", responseData)
            console.log("Successfully login")
            setSuccess(true)

        } catch (error) {
            console.error('Error:', error);
            setSuccess(false)
        }
    };
    // const redirectToWebsite = () => {
    //     window.location.href = "https://dev.baha.co.in/";
    // }

    return (
        <div className="signup-container ">
            {
                success && <Stack sx={{ width: '30%', position: 'fixed', top: '5%', left: '50%', transform: 'translateX(-50%)' }} spacing={2}>
                    <Alert severity="success" >Successfully Login</Alert>

                </Stack>
            }
            <div className="image">
                <div className='form-container'>
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className='d-flex  justify-content-center'>
                                <div><img src={BahaLogo} className='baha-logo' /></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div>
                                    <h6 className="text-center text-dark fw-bold gray d-flex flex-column">Login to your account</h6>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className=''>
                                <div className="mb-3">
                                    <label className="form-label text-dark fw-bold">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="Enter email"
                                        value={data?.user?.email} name="email"
                                        onChange={handleChange}
                                    />
                                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-dark fw-bold">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                        id="password"
                                        placeholder="Enter password"
                                        value={data?.user?.password} name="password"
                                        onChange={handleChange}
                                    />
                                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                                </div>
                                <button type="submit" className="btn btn-warning fw-bold" >
                                    Login
                                </button>
                            </form>
                            <div className="text-center fw-bold mt-3">
                                <p>Don't have an account? <button type="button" className="btn btn-warning fw-bold">Register</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
