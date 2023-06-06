import {useEffect, useState} from "react";
import {getArticles, fetchTopics} from "./api";
import {Link, useParams} from "react-router-dom";
import dayjs from "dayjs";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  Box,
  Button,
  ButtonGroup,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";

const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const {topic} = useParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const [err, setErr] = useState(null);

  useEffect(() => {
    getArticles(topic, sortBy, order).then(({data}) => {
      setArticleList(data);
      setIsLoading(false);
      setSortBy(sortBy);
      setOrder(order);
    });
    fetchTopics()
      .then(({data}) => {
        setTopics(data);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  console.log(sortBy);

  if (isLoading) return <p>Loading Articles...</p>;
  if (err) return <p>404 - Page not Found</p>;
  return (
    <>
      <ul className="Articles">
        <section id="subheader">
          <h2>Click to read articles below</h2>
        </section>
        <section id="topicbar">
          <h3>Filters {<FilterListIcon />}:</h3>
        </section>

        <section id="topicList">
          <TextField
            label="Topics"
            select
            value={topic || "All"}
            key="All"
            // onChange={handleTopicChange}
            sx={{width: "200px", inWidth: "200px"}}
          >
            <MenuItem value="All" key="All" component={Link} to="/">
              All
            </MenuItem>
            {topics.map((topic) => (
              <MenuItem
                key={topic.slug}
                value={topic.slug}
                component={Link}
                to={`/${topic.slug}/`}
              >
                {topic.slug}
              </MenuItem>
            ))}
          </TextField>
        </section>

        <section id="sorting">
          <Box
            width="600px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              label="Sort By"
              select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
              }}
              sx={{width: "200px", inWidth: "200px"}}
            >
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </TextField>
            <TextField
              label="Order By"
              select
              value={order}
              onChange={(event) => {
                setOrder(event.target.value);
              }}
            >
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </TextField>
          </Box>
        </section>

        <h2 className="sub-header"> Latest Articles:</h2>
        {articleList.map((article) => {
          const date = dayjs(article.created_at).format("DD-MM-YYYY h:mm A");
          return (
            <ul key={article.article_id}>
              <Box
                maxWidth="700px" // Set the maximum width for the card container
                width="100%" // Allow the container to take full width
                margin="0 auto" // Center the container horizontally
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "30px",
                  padding: "0 16px", // Add some horizontal padding to the container
                }}
              >
                <Link to={`/articles/${article.article_id}`}>
                  <Card
                    sx={{
                      width: "700px",
                      padding: "32px",
                      position: "center",
                      backgroundColor: "white",
                      margin: "70px",
                    }}
                    elevation={4}
                  >
                    <CardActionArea>
                      <Link to={`/articles/${article.article_id}`}>
                        <h3>{article.title}</h3>

                        {/* <br /> */}
                        <img
                          className="images"
                          src={article.article_img_url}
                          alt={"Oops..No Thumbnail"}
                        ></img>
                      </Link>
                      <h4>{article.topic}</h4>
                      <h4 id="date">Article Posted: {date}</h4>
                    </CardActionArea>
                  </Card>
                </Link>
              </Box>
            </ul>
          );
        })}
      </ul>
    </>
  );
};

export default Articles;
