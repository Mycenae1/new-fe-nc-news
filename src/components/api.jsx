import axios from "axios";

export const getArticles = (topic, sortBy, order) => {
  if (!topic) {
    return axios.get("https://be-nc-news-jz.onrender.com/api/articles", {
      params: {
        sort_by: sortBy,
        order: order,
      },
    });
  } else if (topic) {
    return axios.get(
      `https://be-nc-news-jz.onrender.com/api/articles?topic=${topic}`,
      {
        params: {
          sort_by: sortBy,
          order: order,
        },
      }
    );
  }
};

export const getArticleById = (article_id) => {
  return axios.get(
    `https://be-nc-news-jz.onrender.com/api/articles/${article_id}`
  );
};

export const getCommentsdById = (article_id) => {
  return axios.get(
    `https://be-nc-news-jz.onrender.com/api/articles/${article_id}/comments`
  );
};

export const patchArticleById = (article_id, votes_inc) => {
  const voteIncrement = {
    inc_votes: votes_inc,
  };
  return axios.patch(
    `https://be-nc-news-jz.onrender.com/api/articles/${article_id}`,
    voteIncrement
  );
};

export const postComment = (article_id, newComment) => {
  const commentBody = {
    username: "happyamy2016",
    body: newComment,
  };
  return axios
    .post(
      `https://be-nc-news-jz.onrender.com/api/articles/${article_id}/comments`,
      commentBody
    )
    .then(({data}) => {
      return data;
    });
};

export const fetchTopics = () => {
  return axios.get(`https://be-nc-news-jz.onrender.com/api/topics`);
};

export const deleteComment = (comment_id) => {
  return axios.delete(
    `https://be-nc-news-jz.onrender.com/api/comments/${comment_id}`
  );
};

export const patchCommentById = (comment_id, votes_inc) => {
  const voteIncrement = {
    inc_votes: votes_inc,
  };
  return axios.patch(
    `https://be-nc-news-jz.onrender.com/api/comments/${comment_id}`,
    voteIncrement
  );
};
