
import { useEffect, useState } from "react";
import { getArticleById } from "./api";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments"


const SingleArticle = () => {
    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const {article_id} = useParams();

    useEffect(() => {
        getArticleById(article_id).then(({data}) => {
            setArticle(data.articles)
            setIsLoading(false)
        })

    }, [article_id])

    if (isLoading) return <p>Loading Articles...</p>
    return (
      <section>
        <h2>Article</h2>
        <br/>
        <ul>
          
          <li key={article.article_id}>
            <h3>{article.title}</h3>
            <img id="articleImage" src={article.article_img_url }
            alt={'Oops...No Image'}></img>
            <p>{article.author}</p>
            <p>{article.created_at}</p>
            <p>Votes: {article.votes}</p>
            <p>{article.body}</p>
            <Comments article_id={article_id}/>
           
          </li>
          
        </ul>
      </section>
    );
}

export default SingleArticle