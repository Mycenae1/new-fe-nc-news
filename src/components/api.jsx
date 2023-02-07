import axios from "axios";

export const getArticles = (article_id) => {
    return axios.get('https://be-nc-news-jz.onrender.com/api/articles')
}

export const getArticleById = (article_id) => {
    return axios.get(`https://be-nc-news-jz.onrender.com/api/articles/${article_id}`)   

}