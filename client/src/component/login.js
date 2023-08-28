
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const userObj = {
                email: inputs.email,
                password: inputs.password,
            };

            const res = await axios.post('/login', userObj);

            if (res.data.status) {
                toast.success(res.data.message);

                localStorage.setItem("wallet", res.data.user.wallet)
                const user = JSON.stringify(res.data.user);
                
                localStorage.setItem('user', user);
               
                navigate('/home');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }


    return (
        <div className="form">
            <form onSubmit={handleLogin} className="login-box">
                <Typography
                    className="login-title"
                    variant="h2"
                    color="gray"
                    sx={{ marginBottom: '20px' }}
                >
                    Login
                </Typography>

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
                                    onClick={() =>
                                        setShowPassword(
                                            (prevState) => !prevState
                                        )
                                    }
                                >
                                    {showPassword ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    sx={{ marginTop: '20px' }}
                    type="submit"
                    className="login-button"
                    variant="contained"
                    size="large"
                >
                    Login
                </Button>

                <Button
                    sx={{ marginTop: '20px' }}
                    onClick={() => navigate('/register')}
                >
                    Not a user? Please register
                </Button>
            </form>
        </div>
    );
};

export default Login;
