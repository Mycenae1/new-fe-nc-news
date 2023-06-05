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

const Votes = ({votes, article_id}) => {
  const [changeVotes, setChangeVotes] = useState(0);

  const incVotes = () => {
    setChangeVotes((currentVotes) => currentVotes + 1);
    patchArticleById(article_id, +1);
  };

  const decVotes = () => {
    setChangeVotes((currentVotes) => currentVotes - 1);
    patchArticleById(article_id, -1);
  };

  return (
    <section className="votes">
      <IconButton
        disabled={changeVotes === +1}
        onClick={() => incVotes()}
        aria-label="upvote"
        color="black"
      >
        {<ThumbUpAltIcon />}
      </IconButton>
      <h2>{votes + changeVotes}</h2>
      <IconButton
        disabled={changeVotes === -1}
        onClick={() => decVotes()}
        aria-label="downvote"
        color="black"
      >
        {<ThumbDownAltIcon />}
      </IconButton>
      {/* <button disabled={changeVotes === +1} onClick={() => incVotes()}>
        👍
      </button>
      <h2>{votes + changeVotes}</h2>
      <button disabled={changeVotes === -1} onClick={() => decVotes()}>
        👎
      </button> */}
    </section>
  );
};

export default Votes;
