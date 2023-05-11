import {useEffect, useState} from "react";
import {deleteComment, getCommentsdById} from "./api";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import CommentAdder from "./CommentAdder.jsx";
import CommentVotes from "./CommentVotes.jsx";
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Box,
  Button,
  ButtonGroup,
  Stack,
  MenuItem,
  TextField,
  Chip,
} from "@mui/material";

const Comments = () => {
  const [commentList, setCommentList] = useState([]);
  const {article_id} = useParams();

  useEffect(() => {
    getCommentsdById(article_id).then(({data}) => {
      setCommentList(data);
    });
  }, [article_id]);

  const handleDelete = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        const newCommentList = commentList.filter(
          (comment) => comment.comment_id !== comment_id
        );
        setCommentList([...newCommentList]);
        alert(`Deleted ${comment_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section id="commentList">
      <h3>Comments:</h3>
      <CommentAdder setCommentList={setCommentList} />

      {commentList.map((comment) => {
        const date = dayjs(comment.created_at).format("DD-MM-YYYY h:mm A");
        return (
          <Box
            width="600px"
            sx={{
              display: "flex",
              position: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                width: "700px",
                padding: "32px",
                position: "center",
                backgroundColor: "beige",
                margin: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              elevation={4}
            >
              <ul key={comment.comment_id} className="comments">
                <p className="comment_author">{comment.author}</p>
                <p>{comment.body}</p>
                <CommentVotes
                  commentVotes={comment.votes}
                  comment_id={comment.comment_id}
                />

                {/* <p>Votes: {comment.votes}</p> */}
                <p>Posted: {date}</p>
                {comment.author === "happyamy2016" ? (
                  <Chip
                    label="Delete"
                    color="error"
                    onClick={() => handleDelete(comment.comment_id)}
                    onDelete={() => alert("Delete")}
                  />
                ) : null}
              </ul>
            </Card>
          </Box>
        );
      })}
    </section>
  );
};

export default Comments;
