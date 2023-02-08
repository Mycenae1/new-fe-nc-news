
import { useEffect, useState } from "react";
import { getArticleById } from "./api";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments"
import Votes from "./Votes"
const dayjs = require('dayjs')


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

    const date = dayjs(article.created_at).format('DD-MM-YYYY h:mm A');

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
            <p>{date}</p>
            <div><Votes votes={article.votes} article_id={article_id}/> </div>
            <p>{article.body}</p>
            <br/>
            <Comments article_id={article_id}/>
           
          </li>
          
        </ul>
      </section>
    );
}

export default SingleArticle