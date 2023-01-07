import Blogpost from '../components/Blogpost'
import {useOutletContext} from "react-router-dom";
import {useState} from 'react';
import Select from 'react-select'
import './BloglistPage.scss'

function BloglistPage(){
  
  const context = useOutletContext();
  const posts = context.postState[0]
  // const setPosts = context.postState[1];

  const [sorted, setSorted] = useState(false)
  const [selectedTag, setSelectedTag] = useState('all')

  const sortPostsByDate = () => {
    posts.sort(function(a,b){
      return sorted ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    });
    setSorted(!sorted)
  }
  

  const renderedPosts = posts.map((post) => {
    if(selectedTag === 'all' || post.category === selectedTag){
      //id={post.id} title={post.title} date={post.date} summary={post.summary} text={post.text} tag={post.category}
      return <Blogpost key={post.id} props={post}  />
    }
    return
  })
  const colorStyles = {
    control: (styles) => ({...styles, backgroundColor: "#262e38", border: "none", padding: '5px 0'}),
    option: (styles) => {
      return {...styles, color: "white", backgroundColor: "#262e38", cursor: "pointer", ':hover':{backgroundColor: '#42474e'}}},
    menuList: (styles) => ({
        ...styles,
        paddingTop: 0,
        paddingBottom: 0,
     }),
    placeholder: (styles) => ({...styles, color:'white'}),
    indicatorsContainer: (styles) => ({...styles, color:'white'})
  }

  const options = [
    { value: 'all', label: 'All'},
    { value: 'html', label: 'HTML'},
    { value: 'css', label: 'CSS'},
    { value: 'javascript', label: 'Javascript'},
  ]

  return (
    <div className="container">
      <div className="bloglist-header">
        <h2>Latest Posts</h2>
        <div className="bloglist-options">
        <Select styles={colorStyles} className="dropdown" options={options} onChange={(choice) => setSelectedTag(choice.value)}/>
        <button onClick={sortPostsByDate}>Sort by Date</button>
        </div>
      </div>
      <div className="blogposts">{renderedPosts}</div>
    </div>
  );
}

export default BloglistPage