
import { useEffect, useState } from "react";
import { getArticleById } from "./api";
import { useParams } from "react-router-dom";


const SingleArticle = () => {
    const [article, setArticle] = useState([])
    const {article_id} = useParams();

    useEffect(() => {
        getArticleById(article_id).then(({data}) => {
            console.log(data.articles)
            setArticle(data.articles)
        })

    }, [article_id])

    return (
      <section>
        <h2>Article</h2>
        <ul>
          <li key={article.article_id}>
            <h3>{article.article_title}</h3>
            <img id="articleImage" src={article.article_img_url}></img>
            <p>{article.author}</p>
            <p>{article.created_at}</p>
            <p>Votes: {article.votes}</p>
            <p>{article.body}</p>
          </li>
        </ul>
      </section>
    );
}

export default SingleArticle