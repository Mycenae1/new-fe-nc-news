import axios from "axios";

export const getArticles = (article_id) => {
    return axios.get('https://be-nc-news-jz.onrender.com/api/articles')
}

export const getArticleById = (article_id) => {
    return axios.get(`https://be-nc-news-jz.onrender.com/api/articles/${article_id}`)   

}

export const getCommentsdById = (article_id) => {
    return  axios.get(`https://be-nc-news-jz.onrender.com/api/articles/${article_id}/comments`)
    }


export const patchArticleById = (article_id, votes_inc) => {
    const voteIncrement = {
        inc_votes: votes_inc
    }
    return axios.patch(`https://be-nc-news-jz.onrender.com/api/articles/${article_id}`, voteIncrement)

}

