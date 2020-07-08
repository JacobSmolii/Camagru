import React, { useEffect, useState } from 'react'

import Axios from 'axios'
import SinglePost from './SinglePost'

function Home(props) {


  // const [posts, setPosts] = useState({
  //   id: null,
  //   account_id: null,
  //   picture: "",
  //   created_at: null,
  //   updated_at: null
  // })

  const [posts, setPosts] = useState([])


  useEffect(() => {
    Axios
      .get('http://localhost:5000')
      .then(res => {
		// console.log(res.data.respond)
		setPosts(res.data.respond)
      })
      .catch(err => console.log('Problem to fetch the posts', err))
  }, [])


	return (
		<div>
			{posts.map((post, index) => {
				return <SinglePost key={index} post={post} />
			})}
		</div>
	);
}

export default Home;
