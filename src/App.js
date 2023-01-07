import {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';


function App(){
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [fullPost, setFullPost] = useState({
    title: "",
    date: "",
    summary: "",
    text: "",
    category: ""
  });

  //Fetches from db.json and saves response in 'posts'
  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:3001/posts')
    setPosts(response.data)
  }

  //Runs fetchPosts on first render
  useEffect(() => {
    fetchPosts();
  }, [])

//Runs inside <BlogpostCreatePage>
  const createPost = async (title, date, summary, text, category) => {
    const response = await axios.post('http://localhost:3001/posts', {
      title,
      date,
      summary,
      text,
      category
    })
    setPosts([...posts, response.data])
    navigate("/");
  }

  //Runs inside <BlogpostFullPage>
  const deletePostById = async (id) => {
    await axios.delete(`http://localhost:3001/posts/${id}`)
    const updatedPosts = posts.filter((post) => {
      return post.id !== id;
    })
    setPosts(updatedPosts)
    fetchPosts()
    navigate("/");
  }

  return(
    <>
      <Navbar />
      <Outlet context={{createPost, deletePostById, postState:[posts,setPosts], fullPostState:[fullPost, setFullPost]}}/>
    </>
  )
}

export default App