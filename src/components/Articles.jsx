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
    const [err, setErr] = useState(null);
   
    
    useEffect(() => {
        getArticles(topic, sortBy, order).then(({data}) => {
            setArticleList(data);
            setIsLoading(false)
            setSortBy(sortBy)
            setOrder(order)
        })
        fetchTopics().then(({data}) => {
          setTopics(data);
        })
        .catch((err) => {
          console.log(err);
          setErr(err);
          setIsLoading(false)
        });
    
      }, [topic, sortBy,order]);

      console.log(sortBy)

      if (isLoading) return <p>Loading Articles...</p>
      if(err) return <p>404 - Page not Found</p>
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
      <ul className="Articles">
    
   <section id="subheader">
    <h2>Click to read articles below</h2>
    </section>
    <h3>Sort By:</h3>
   <select onChange={(event) => {
    setSortBy(event.target.value)
   }}>
    <option value='created_at'>Date</option>
    <option value='title'>Title</option>
    <option value='votes'>Votes</option>
   </select>
   <select onChange={(event) => {
    setOrder(event.target.value)
   }}>
    <option value='ASC'>Ascending</option>
    <option value='DESC'>Descending</option>
  
   </select>
      {/* <button onClick={() => setSortBy('created_at')}>Date</button>
      <button onClick={() => setSortBy('title')}>Title</button>
      <button onClick={() => setSortBy('votes')}>Votes</button>
      <br/>
      <button onClick={() => setOrder('ASC')}>Ascending</button>
      <button onClick={() => setOrder('DESC')}>Descending</button> */}
  
    <h2 className="sub-header"> Latest Articles:</h2>
        {articleList.map((article) => {
          const date = dayjs(article.created_at).format('DD-MM-YYYY h:mm A');
          return (
           
            <li key={article.article_id}>
             
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