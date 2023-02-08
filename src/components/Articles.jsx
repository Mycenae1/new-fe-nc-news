import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { getArticles} from "./api";
import { Link } from "react-router-dom";
import dayjs from "dayjs";



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
    <h2>Click to read articles below</h2>
        {articleList.map((article) => {
          const date = dayjs(article.created_at).format('DD-MM-YYYY h:mm A');
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
              <h4 id="date">Article Posted: {date}</h4>

            </li>
          );
        })}
      </ul>
    
  );
};


export default Articles