import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'

interface ForgetData {
    email: string;
    submitted: boolean
}

interface ForgetState {
    forgetData: ForgetData;
    submittedData: FormData[];
}
export default class Forget extends Component<{}, ForgetState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            forgetData: { email: "", submitted: false },
            submittedData: []
        }
    }
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("message", this.state.forgetData.email);

        const { forgetData, submittedData } = this.state
        const emailMatch = submittedData.some(
            (data) => data.email === forgetData.email
                // data.email === forgetData.email
        );
        
        if(emailMatch){
            alert("email matched")
        }
        else {
            alert("email not matched")
        }
    }

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
                // submitted: true,
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

                    <Button type='submit' variant='contained' color='primary' fullWidth>Submit </Button>

                </form>
            </>
        )
    }
}
