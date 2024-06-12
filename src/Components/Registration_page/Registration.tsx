
// import React, { Component } from 'react';
// import { TextField, Button, Typography } from '@mui/material';

// type FormData = {
//   username: string;
//   email: string;
//   password: string;
// };

// type State = {
//   formData: FormData;
//   submittedData: FormData[];
//   submitted: boolean;
// };

// class Registration extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       formData: { username: '', email: '', password: '' },
//       submittedData: [],
//       submitted: false,
//     };
//   }
//   componentDidMount() {
//     const submittedData = localStorage.getItem('submittedData');
//     if (submittedData) {
//       this.setState({
//         submittedData: JSON.parse(submittedData),
//         submitted: true,
//       });
//     }
//   }
//   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       formData: { ...prevState.formData, [name]: value },
//     }));

//   };

//   handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const isValid = this.formvalidation();

//     this.setState(
//       (prevState) => ({
//         submittedData: [...prevState.submittedData, prevState.formData],
//         submitted: true,
//         formData: { username: '', email: '', password: '' },
//       }),
//       () => {
//         localStorage.setItem('submittedData', JSON.stringify(this.state.submittedData));
//       }
//     );
//   };


//   formvalidation = () => {
//     const { username, email ,password} = this.state;
//     // let isValid = true;

//    if (!username && !email && !password) {
//       alert("field are required")
//     }

//   }
//   render() {
//     const { formData, submittedData, submitted } = this.state;

//     return (
//       <div>
//         <h1>Registration Form</h1>
//         <form onSubmit={this.handleSubmit}>
//           <TextField
//             label="Username"
//             name="username"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.username}
//             onChange={this.handleChange}
//           />
//           <TextField
//             label="Email"
//             type='email'
//             name="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.email}
//             onChange={this.handleChange}
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.password}
//             onChange={this.handleChange}

//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Submit
//           </Button>
//         </form>
//         {submitted && (
//           <div>
//             <Typography variant="h6" component="h2" gutterBottom>
//               Submitted Data
//             </Typography>
//             {submittedData.map((data, index) => (
//               <div key={index}>
//                 <Typography>Username: {data.username}</Typography>
//                 <Typography>Email: {data.email}</Typography>
//                 <Typography>Password: {data.password}</Typography>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );

//   }
// }

// export default Registration;


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
  
};

class Registration extends Component<{}, State> {
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
    const isValid = this.formvalidation();

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
    };
  };

  formvalidation = (): boolean => {
    const { username, email, password } = this.state.formData;
    if (!username) {
      alert("username is  required");
    }
    if (!email) {
      alert("email is required");
    }
    if(!password){
      alert("passwword is required")  
    }
    return true;
  };

  render() {
    const { formData, submittedData, submitted } = this.state;

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
          // error="error"
          />
          {/* <p>username is re</p> */}
          <TextField
            label="Email"
            type="email"
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
