import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { getArticles} from "./api";

const Articles = () => {
    const [articleList, setArticleList] = useState([])
    // const { article_name } = useParams();
    
    useEffect(() => {
        console.log('hello')
        getArticles().then(({response}) => {
            console.log('hello');
            // setArticleList(data.items);
        });
    
      }, []);

console.log(articleList)

  return (
    
      <ul>
        {articleList.map((article) => {
          return (
            <li key={article.article_id}>
              {article.article_name}
              <br />
              <img className="images" src={article.article_img_url}></img>
              
            </li>
          );
        })}
      </ul>
    
  );
};


export default Articles