
import React, { Component } from 'react';
import { TextField, Button } from '@mui/material';

type FormData = {
    username: string;
    email: string;
    password: string;
};

type State = {
    formData: FormData;
    submittedData: FormData[];
    submitted: boolean;
};

class Login extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: { username: '', email: '', password: '' },
            submittedData: [],
            submitted: false,
        };
    }
    componentDidMount() {
        const submittedData = localStorage.getItem('submittedData');
        if (submittedData) {
            this.setState({
                submittedData: JSON.parse(submittedData),
                submitted: true,
            });
        }
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
        }));
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { formData, submittedData } = this.state;
        const match = submittedData.some(
            (data) =>
                data.username === formData.username &&
                data.email === formData.email &&
                data.password === formData.password
        );

        if (match) {
            alert("field match ")
        }
        else {
            alert("field not match")
        }

        // this.setState(
        //   (prevState) => ({
        //     submittedData: [...prevState.submittedData, prevState.formData],
        //     submitted: true,
        //     formData: { username: '', email: '', password: '' },
        //   }),
        //   () => {
        //     localStorage.setItem('submittedData', JSON.stringify(this.state.submittedData));
        //   }
        // );
    };

    render() {
        const { formData } = this.state;

        return (
            <div>
                <h1>Login Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        label="Email"
                        type='email'
                        name="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={this.handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>

                    <a href='http://localhost:3000/forget'>Forget page</a>
                </form>

               

            </div>
        );

    }
}

export default Login;



