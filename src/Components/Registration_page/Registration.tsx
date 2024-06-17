import React, { Component } from 'react';
import { TextField, Button, Typography } from '@mui/material';

type FormData = {
  username: string;
  email: string;
  password: string;
};

type State = {
  formData: FormData;
  submittedData: FormData[];
  submitted: boolean;
  errors: FormData;
};

class Registration extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      formData: { username: '', email: '', password: '' },
      submittedData: [],
      submitted: false,
      errors: { username: '', email: '', password: '' },
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
      errors: { ...prevState.errors, [name]: '' },
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = this.formValidation();

    if (isValid) {
      this.setState(
        (prevState) => ({
          submittedData: [...prevState.submittedData, prevState.formData],
          submitted: true,
          formData: { username: '', email: '', password: '' },
        }),
        () => {
          localStorage.setItem('submittedData', JSON.stringify(this.state.submittedData));
        }
      );
    }
  };

  formValidation = (): boolean => {
    const { username, email, password } = this.state.formData;
    const { submittedData } = this.state;
    const errors: FormData = { username: '', email: '', password: '' };
    let isValid = true;

    if (username === '') {
      errors.username = 'Username is required';
      isValid = false;
    }
    else if (submittedData.some((data)=>data.username===username)){
      errors.username="Username already exist";
      isValid=false;
    }
    if (email === '') {
      errors.email = 'Email is required';
      isValid = false;
    }
    else if (submittedData.some((data) => data.email === email)) {
      errors.email = 'Email already exist';
      isValid = false;
    }
    if (password === '') {
      errors.password = 'Password is required';
      isValid = false;
    }
    
    this.setState({ errors });
    return isValid;
  };

  render() {
    const { formData, submittedData, submitted, errors } = this.state;

    return (
      <div>
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={this.handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={this.handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
        {submitted && (
          <div>
            <Typography variant="h6" component="h2" gutterBottom>
              Submitted Data
            </Typography>
            {submittedData.map((data, index) => (
              <div key={index}>
                <Typography>Username: {data.username}</Typography>
                <Typography>Email: {data.email}</Typography>
                <Typography>Password: {data.password}</Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Registration;
