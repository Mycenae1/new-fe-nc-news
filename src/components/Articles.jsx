import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { getArticles} from "./api";

const Articles = () => {
    const [articleList, setArticleList] = useState([])
    // const { article_name } = useParams();
    
    useEffect(() => {
        console.log('hello')
        getArticles().then(({data}) => {
            setArticleList(data);
        });
    
      }, []);


  return (
    
      <ul>
        {articleList.map((article) => {
          return (
            <li key={article.article_id}>
              <h2 class="sub-header"> Latest Articles:</h2>
              <h3>{article.title}</h3>

              {/* <br /> */}
              <img className="images" src={article.article_img_url}></img>
              <h4>{article.topic}</h4>
              <h4 id="date">{article.created_at}</h4>
            </li>
          );
        })}
      </ul>
    
  );
};


export default Articles