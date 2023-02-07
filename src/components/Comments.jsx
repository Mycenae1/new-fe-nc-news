import { useEffect, useState } from "react";
import {  getCommentsdById } from "./api";
import { useParams } from "react-router-dom";


const Comments = () => {
  const [commentList, setCommentList] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getCommentsdById(article_id).then(({ data }) => {
      setCommentList(data);
    });
  }, [article_id]);

  return (
    <section>
      <h3>Comments:</h3>
      {commentList.map((comment) => {
        return (
          <li key={comment.comment_id} className="comments">
            <p className="comment_author">{comment.author}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Posted: {comment.created_at}</p>
          </li>
        );
      })}
    </section>
  );
}

export default Comments