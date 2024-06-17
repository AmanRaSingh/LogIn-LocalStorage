import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
interface ForgetData {
    email: string;
    submitted: boolean;
    num: string;
    popup: boolean
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
                submitted: false,
                popup: false
            },
            submittedData: []
        }
    }
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("message", this.state.forgetData.email);
        const { forgetData, submittedData } = this.state;
        // this.setState({ popup: true })

        const emailMatch = submittedData.some(
            (data) => data.email === forgetData.email
        );
        if (emailMatch) {
            alert("email matched");
            this.setState({
                forgetData: {
                    ...forgetData,
                    popup: true
                }
            });
        } else {
            alert("email not matched");
            return null;
        }
        const generateOTP = (num: number) => {
            let digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < num; i++) {
                OTP += digits[Math.floor(Math.random() * 10)]
            }
            return OTP;
        }
        console.log("generate OTP", generateOTP(4))
    }

    // const matchOTP=submittedData.some(
    //     (data)=>data.enterOTP===generateOTP.email
    // )



    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            forgetData: { ...this.state.forgetData, [e.target.name]: e.target.value }
        });
    }
    componentDidMount() {
        const submittedData = localStorage.getItem('submittedData');
        if (submittedData) {
            this.setState({
                submittedData: JSON.parse(submittedData),
            });
        }
    }
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
                <form>
                    {this.state.forgetData.popup && (
                        <div>
                            <h1>OTP Page</h1>
                            <TextField
                                label='Enter OTP'
                                name='enterotp'
                                type='enterotp'
                                variant="outlined"
                                fullWidth
                                margin='normal'
                            />
                            <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                        </div>
                    )}
                </form>
            </>
        )
    }
}
