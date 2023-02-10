import { useEffect, useState } from "react";
import { getArticles, fetchTopics} from "./api";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";



const Articles = () => {
    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const {topic} = useParams()
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('DESC')

   
    
    useEffect(() => {
        getArticles(topic, sortBy, order).then(({data}) => {
            setArticleList(data);
            setIsLoading(false)
            setSortBy(sortBy)
            setOrder(order)
        });
        fetchTopics().then(({data}) => {
          setTopics(data);
        });
    
      }, [topic, sortBy,order]);

      console.log(sortBy)

  if (isLoading) return <p>Loading Articles...</p>

  return (
    <>
          {topics.map((topic) => {
        return (
          <Link
            key={topic.slug}
            to={`/${topic.slug}/`}
          >
            <button>{topic.slug}</button>
          </Link>
        );
      })}
      <ul>
    
   <section>
    <h2>Click to read articles below</h2>
    </section>
    <h3>Sort By:</h3>
   
      <button onClick={() => setSortBy('created_at')}>Date</button>
      <button onClick={() => setSortBy('title')}>Title</button>
      <button onClick={() => setSortBy('votes')}>Votes</button>
      <br/>
      <button onClick={() => setOrder('ASC')}>Ascending</button>
      <button onClick={() => setOrder('DESC')}>Descending</button>
    <section>

    </section>
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
      </>
    
  );
};


export default Articles