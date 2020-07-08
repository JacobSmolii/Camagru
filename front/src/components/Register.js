import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function Register(props) {
	const [credentials, setCredentials] = useState({
		name: '',
		password: '',
		email: ''
	});
	let history = useHistory();


	const onChangeHandler = e => {
		const {name, value} = e.target;
		setCredentials({...credentials, [name]: value});
	}

	const onSubmitHandler = e => {
		e.preventDefault();
		axios.post('http://localhost:5000/register', credentials)
			.then(responce => {
				console.log(responce)
				// console.log("from register", responce.data)
				// if (responce.data)
					history.push('/');
			})
			.catch(err => console.log("Register error", err))
	}

	return (
		<div>
			<form onSubmit={onSubmitHandler} >
				<div>
					<input
						type="text"
						name="name"
						placeholder="Name"
						required
						value={credentials.name}
						onChange={onChangeHandler}
					/>
				</div>

				<div>
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						value={credentials.password}
						onChange={onChangeHandler}
					/>
				</div>

				<div>
					<input
						type="text"
						name="email"
						placeholder="email"
						required
						value={credentials.email}
						onChange={onChangeHandler}
					/>
				</div>

				<button>Register</button>
			</form>

			<div>
				<p>Already have an account?</p>
				<Link to="/login">Sign In</Link>
			</div>
		</div>
	);
}

export default Register;
