import { useEffect, useState } from "react";
import {  getCommentsdById } from "./api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentAdder from "./CommentAdder.jsx";


const Comments = () => {
  const [commentList, setCommentList] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getCommentsdById(article_id).then(({ data }) => {
      setCommentList(data);
      console.log('useEffect')
    });
  }, [article_id]);

  return (
    <section>
      <h3>Comments:</h3>
      <CommentAdder setCommentList={setCommentList} />
      {commentList.map((comment) => {
        const date = dayjs(comment.created_at).format('DD-MM-YYYY h:mm A');
        return (
          <li key={comment.comment_id} className="comments">
            <p className="comment_author">{comment.author}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Posted: {date}</p>
          </li>
        );
      })}
    </section>
  );
}

export default Comments