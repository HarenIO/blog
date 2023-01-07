import { useOutletContext } from "react-router-dom";
import {useState} from 'react';
import './BlogpostCreatePage.scss'

function BlogpostCreate(){



  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`

  const context = useOutletContext();
  const [content, setContent] = useState({
    title: "",
    date: currentDate,
    summary: "",
    text: "",
    category: ""
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleSubmit = (e) => {
    if(content.category === "" || content.title === "" || content.summary === "" || content.text==="") {
      e.preventDefault();
      setErrorMessage("Please fill out all fields.");
      return
    }
    e.preventDefault();
    setErrorMessage("");
    context.createPost(content.title, content.date, content.summary, content.text, content.category)
    setContent({
      title: "",
      date: "",
      summary: "",
      text: "",
      category: ""
    })
  }

  const handleTitleChange = (e) => {
    setContent({
      ...content,
      title: e.target.value
    })
  }
  const handleSummaryChange = (e) => {
    setContent({
      ...content,
      summary: e.target.value
    })
  }
  const handleTextChange = (e) => {
    setContent({
      ...content,
      text: e.target.value
    })
  }
  const handleTagClick = (e) => {
    e.preventDefault();
    setSelectedTag(e.target.textContent.toLowerCase())
    setContent({
      ...content,
      category: e.target.textContent.toLowerCase()
    })
} 
  

  return(
    <div className="container create-post">
      
      <h1 className="create-header">Create Blogpost{errorMessage && <p className="error-message">{errorMessage}</p>}</h1>
      <form onSubmit={handleSubmit}>
      

        <label htmlFor="title">Title:</label>
        <input className="post-inputs" onChange={handleTitleChange} value={content.title} id="title"/>

        <label htmlFor="summary">Summary:</label>
        <input className="post-inputs" onChange={handleSummaryChange} value={content.summary} id="summary"/>

        <label htmlFor="text">Text:</label>
        <textarea className="post-inputs" onChange={handleTextChange} value={content.text} id="text"/>
        <div className="footer">
        <div className="tag-area">
          <p>Tag</p>
          <div className="tag-btn">
            
          <button onClick={handleTagClick} style={{backgroundColor: selectedTag === "html" ? "#2c3641" : "#1e262f"}}>HTML</button>

          <button onClick={handleTagClick} style={{backgroundColor: selectedTag === "css" ? "#2c3641" : "#1e262f"}}>CSS</button>

          <button onClick={handleTagClick} style={{backgroundColor: selectedTag === "javascript" ? "#2c3641" : "#1e262f"}}>JavaScript</button>
          </div>
        </div>
        <button className="submit-btn">Submit</button>
        </div>
      </form>
      
    </div>
  )
}

export default BlogpostCreate