import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { getArticles} from "./api";
import { Link } from "react-router-dom";


const Articles = () => {
    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getArticles().then(({data}) => {
            setArticleList(data);
            setIsLoading(false)
        });
    
      }, []);

  if (isLoading) return <p>Loading Articles...</p>

  return (
    
      <ul>
        {articleList.map((article) => {
          return (
           
            <li key={article.article_id}>
              <h2 className="sub-header"> Latest Articles:</h2>
               <Link to={`/articles/${article.article_id}`}>
              <h3>{article.title}</h3>

              {/* <br /> */}
              <img className="images" src={article.article_img_url} 
              alt={'Oops..No Thumbnail'}></img>
              </Link>
              <h4>{article.topic}</h4>
              <h4 id="date">{article.created_at}</h4>

            </li>
          );
        })}
      </ul>
    
  );
};


export default Articles