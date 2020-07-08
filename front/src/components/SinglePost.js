import React from 'react'
import { Link, Switch, Route } from 'react-router-dom';


// const Test = styled.div`
// 	border:1px solid red;
// 	width:50%;
// 	margin: 0 auto;
// 	display:inline-block;

function SinglePost({post}) {

	function commentClick(post) {
		console.log(post)

		// window.location.href=`/post/${id}`

	}

	return (
		<div>
			<ul>
				{/* <li className="singlePost"> */}
				<li style={stylePost}>
					{post.picture}


					<div>
							<button onClick={commentClick(post)}>Comment</button>
							<button>Like</button>
					</div>
				</li>
			</ul>
		</div>
	);
}

const stylePost = {
	"width": "50%",
	"height": '50%',
	'border': "1px solid red",
	"display": "inline-block"

}

export default SinglePost;
