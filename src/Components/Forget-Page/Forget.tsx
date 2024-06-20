
import React, { Component } from 'react';
import { Button, TextField } from '@mui/material';

interface ForgetData {
    email: string;
    submitted: boolean;
    num: string;
    popup: boolean;
    passwordPopup: boolean;
    enteredOTP?: string;
    generateOTP?: string;
    newPassword: string;
    confirmPassword: string;
    data: string;
}

interface ForgetState {
    forgetData: ForgetData;
    submittedData: ForgetData[];
}

export default class Forget extends Component<{}, ForgetState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            forgetData: {
                email: "",
                num: "",
                newPassword: "",
                confirmPassword: "",
                data: "",
                submitted: false,
                popup: false,
                passwordPopup: false,
            },
            submittedData: []
        };
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { forgetData, submittedData } = this.state;
        const emailMatch = submittedData.some(data => data.email === forgetData.email);

        if (emailMatch) {
            alert("Email matched");
            const generateOTP = (num: number) => {
                let digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < num; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            };
            const generatedOTP = generateOTP(4);
            console.log(generatedOTP)
            this.setState({
                forgetData: {
                    ...forgetData,
                    popup: true,
                    generateOTP: generatedOTP
                },
            });
        } else {
            alert("Email not matched");
        }
    };

    handleOTPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { forgetData } = this.state;

        if (forgetData.enteredOTP === forgetData.generateOTP) {
            alert("OTP Matched");
            this.setState({
                forgetData: {
                    ...forgetData,
                    passwordPopup: true
                }
            });
        } else {
            alert("OTP not matched");
        }
    };
    componentDidMount() {
        const submittedData = localStorage.getItem('submittedData');
        if (submittedData) {
            this.setState({
                submittedData: JSON.parse(submittedData)
            });
        }
    }
    handleNewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { forgetData, submittedData } = this.state;
    
        if (forgetData.newPassword === forgetData.confirmPassword) {
            console.log("Password matched");
            console.log("New Password", this.state.forgetData.newPassword);
            console.log("Confirm Password", this.state.forgetData.confirmPassword);
    
            const updatedSubmittedData = submittedData.map(data => {
                if (data.email === forgetData.email) {
                    return {
                        ...data,
                    password: forgetData.newPassword
                    };
                }
                return data;
            });
    
            this.setState({
                submittedData: updatedSubmittedData,
                forgetData: {
                    ...forgetData,
                    passwordPopup: false
                },
            }, () => {
                localStorage.setItem('submittedData', JSON.stringify(updatedSubmittedData));
                alert("Password updated successfully.");
            });
    
        } else {
            alert("Passwords do not match.");
        }
    };
    

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            forgetData: { ...this.state.forgetData, [e.target.name]: e.target.value }
        });
    };

    render() {
        return (
            <>
                <h1>Forget Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={this.state.forgetData.email}
                        onChange={this.handleChange}
                    />
                    <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                </form>
                {this.state.forgetData.popup && (
                    <form onSubmit={this.handleOTPSubmit}>
                        <h2>OTP Page</h2>
                        <TextField
                            label='Enter OTP'
                            name='enteredOTP'
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            value={this.state.forgetData.enteredOTP}
                            onChange={this.handleChange}
                        />
                        <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                    </form>
                )}
                {this.state.forgetData.passwordPopup && (
                    <form onSubmit={this.handleNewSubmit}>
                        <h3>New Password</h3>
                        <TextField
                            label="New Password"
                            name="newPassword"
                            type="password"
                            fullWidth
                            margin='normal'
                            value={this.state.forgetData.newPassword}
                            onChange={this.handleChange}
                        />
                        <TextField
                            label='Confirm Password'
                            name='confirmPassword'
                            type="password"
                            fullWidth
                            margin='normal'
                            value={this.state.forgetData.confirmPassword}
                            onChange={this.handleChange}
                        />
                        <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                    </form>
                )}
            </>
        );
    }
}

