
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import './wallet.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Wallet = () => {
    const [walletBalance, setWalletBalance] = useState(0);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("wallet")) {
            setWalletBalance(JSON.parse(localStorage.getItem("wallet")))
        }
    }, []);

    const handleTopUpClick = () => {
        setIsModalOpen(true);
    };

    const handleTopUpSubmit = async () => {
        if (topUpAmount !== '') {
            if (topUpAmount.includes("-")) {
                toast.error("Enter positive value")
            }
            else {
                const amount = parseFloat(topUpAmount);
                setWalletBalance(walletBalance + amount);
                setTopUpAmount('');
                setIsModalOpen(false);

                const user = JSON.parse(localStorage.getItem("user"));
                console.log(user._id);

                try {
                    const res = await axios.put(`/updateWallet/${user._id}`, { amountToAdd: topUpAmount });
                    if (res?.data?.status) {
                        toast.success(res.data.message);
                        localStorage.setItem("wallet", res.data.availableBalance);
                    }

                } catch (error) {
                    toast.error("error in update wallet amount")
                    console.log("err in update wallet amount");
                }

            }
        }
    };


    return (
        <div className='container'>
            <div className='wallet'>
                <Typography variant="h6" className="wallet-title">Wallet Balance</Typography>
                <Typography variant='h3' className="wallet-balance">{walletBalance}</Typography>
                <Button onClick={handleTopUpClick} variant="contained" size='large' className="top-up-button">Top Up</Button>

                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Box className="modal-content">
                        <Typography variant="h6" className="modal-title">Top Up Wallet</Typography>
                        <TextField
                            type='Number'
                            label="Amount"
                            variant="outlined"
                            fullWidth
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            className="modal-input"
                        />
                        <Button onClick={handleTopUpSubmit} variant="contained" color="primary" className="modal-submit-button">
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default Wallet;



// useEffect() will get amount of wallet from localstorage set that amount to state
// update wallet make an api call which will update the money in wallet and return available amount of wallet