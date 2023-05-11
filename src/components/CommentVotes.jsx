import {useEffect, useState} from "react";
import {patchArticleById, patchCommentById} from "./api";

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
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const CommentVotes = ({commentVotes, comment_id}) => {
  const [changeVotes, setChangeVotes] = useState(0);

  const incVotes = () => {
    setChangeVotes((currentVotes) => currentVotes + 1);
    patchCommentById(comment_id, +1);
  };

  const decVotes = () => {
    setChangeVotes((currentVotes) => currentVotes - 1);
    patchCommentById(comment_id, -1);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
      <IconButton
        disabled={changeVotes === +1}
        onClick={() => incVotes()}
        aria-label="upvote"
        color="success"
      >
        {<ThumbUpAltIcon />}
      </IconButton>
      <h2>{commentVotes + changeVotes}</h2>
      <IconButton
        disabled={changeVotes === -1}
        onClick={() => decVotes()}
        aria-label="downvote"
        color="error"
      >
        {<ThumbDownAltIcon />}
      </IconButton>
    </Box>
  );
};

export default CommentVotes;
