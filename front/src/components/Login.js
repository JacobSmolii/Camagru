import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
	let history = useHistory();

	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: ""
	});

	const onChangeHandler = e => {
		const {name, value} = e.target;
		setLoginInfo({...loginInfo, [name]: value});
	}

	const onSubmitHandler = e => {
		e.preventDefault();

		axios.post('http://localhost:5000/login', loginInfo)
			.then(response => {
				localStorage.setItem('token', response.data.token)
				history.push('/')
			})
			.catch(err => console.log("login err", err))
	}

	return (
		<div>
			<form onSubmit={onSubmitHandler} >

				<div>
					<input
						type="text"
						name="email"
						placeholder="email"
						required
						value={loginInfo.email}
						onChange={onChangeHandler}
					/>
				</div>

				<div>
					<input
						type="password"
						name="password"
						placeholder="password"
						required
						value={loginInfo.password}
						onChange={onChangeHandler}
					/>
				</div>
				<button>Login</button>
			</form>

			<div>
				<p>Don't have an account?</p>
				<Link to="/register">Register</Link>
			</div>
		</div>
	);
}

export default Login;
