import {useEffect, useState} from "react";
import {getArticleById} from "./api";
import {Link, useParams} from "react-router-dom";
import Comments from "./Comments";
import Votes from "./Votes";
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
} from "@mui/material";

const dayjs = require("dayjs");

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {article_id} = useParams();
  const [err, setErr] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then(({data}) => {
        setArticle(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, [article_id]);

  const date = dayjs(article.created_at).format("DD-MM-YYYY h:mm A");

  if (isLoading) return <p>Loading Articles...</p>;
  if (err) return <p>404 - Article not Found</p>;
  return (
    <section className="SingleArticle">
      <br />
      <ul className="content-wrapper">
        <ul key={article.article_id}>
          <h3>{article.title}</h3>
          <img
            id="articleImage"
            src={article.article_img_url}
            alt={"Oops...No Image"}
          ></img>
          <p>{article.author}</p>
          <p>{date}</p>
          <div>
            <Votes votes={article.votes} article_id={article_id} />{" "}
          </div>
          <p>{article.body}</p>
          <br />
          <Comments article_id={article_id} />
        </ul>
      </ul>
    </section>
  );
};

export default SingleArticle;
