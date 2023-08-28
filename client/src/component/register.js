

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; 

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // state for inputs
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });

    // handling input
    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    // user registration
    async function handleRegister(e) {
        e.preventDefault();

        try {
            const userObj = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            };

            // sending user's data to backend
            const res = await axios.post('/register', userObj);

            // toast message
            if (res.data.status) {
                toast.success(res.data.message);
                navigate('/');
            }
            // if email is already exists
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Error in Registration');
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleRegister} className="form">
            <Box className="register-box">
                <Typography className="register-title" variant="h2" color="gray">
                    Register
                </Typography>

                {/* name field */}
                <TextField
                    variant="outlined"
                    className="text-field"
                    label="Name"
                    type="text"
                    name="name"
                    margin="normal"
                    value={inputs.name}
                    onChange={handleInputChange}
                    required
                />

                {/* email field */}
                <TextField
                    variant="outlined"
                    className="text-field"
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                />

                {/* password field */}
                <TextField
                    variant="outlined"
                    className="password-field"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    margin="normal"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* register button */}
                <Button sx={{marginTop : "20px"}}
                    type="submit"
                     className="register-button"
                    variant="contained"
                >
                    Register
                </Button>

                {/* button for navigate to login */}
                <Button sx={{marginTop : "20px"}}
                    onClick={() => navigate('/')}
                >
                    Already Registered? Please Login
                </Button>
            </Box>
        </form>
    );
};

export default Register;
