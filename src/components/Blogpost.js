import './Blogpost.scss';
import { useOutletContext, useNavigate } from 'react-router-dom';

function Blogpost({ props }) {
  const context = useOutletContext();
  const fullPost = context.fullPostState[0];
  const setFullPost = context.fullPostState[1];
  const navigate = useNavigate();
  const {id, title, date, summary, text, category} = props

  const handleClick = () => {
    setFullPost({
      ...fullPost,
      title,
      date,
      summary,
      text,
    });
    navigate(`/post/${id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <p className="card-title">{title}</p>
      <p className="card-summary">{summary}</p>
      <div className="card-footer">
        <p className="card-readmore">Read more</p>
        <p className="card-date">{date}</p>
      </div>
    </div>
  );
}

export default Blogpost;
