import { useOutletContext, useParams } from "react-router-dom";
import {useEffect} from 'react';
import axios from 'axios'
import './BlogpostFullPage.scss'

function BlogpostFullPage(){
  //Destructure !
  const context = useOutletContext();
  const deletePostById = context.deletePostById;
  const fullPost = context.fullPostState[0]
  const setFullPost = context.fullPostState[1]
  const { title, date, summary, text, category } = fullPost;
  //Tar sista parametern från URL och assignar den till 'id'
  const { id } = useParams();


  
  useEffect(() => {
    const fetchBlogpost = async () => {
      const response = await axios.get(`http://localhost:3001/posts/${id}`);
      setFullPost(response.data);
    };
    fetchBlogpost();
  }, [id]);


  const handleClick = () => {
    deletePostById(id)
  }
  
  return(
    <div className="container blogpost-full">
      <div className="header">
        <h2>{title}</h2>
        <span>{date}</span>
      </div>
      <p className="text">{text}</p>
      <button onClick={handleClick}>Delete Post</button>
    </div>
  )
}


export default BlogpostFullPage;