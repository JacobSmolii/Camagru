import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useParams } from 'react-router-dom';


function Post(props) {

	const [post, setPost] = useState({});

	const {id} = useParams();

	useEffect(() => {
		axiosWithAuth()
			.get(`/post/${id}`)
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log('Post err', err));
	})

	return (
		<div>i am here</div>
	);
}

export default Post;
