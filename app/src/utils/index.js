export const getAuthors = (articles) => {
  return articles.reduce((acc, article) => {
    if (article.author) {
      if (!acc.hasOwnProperty(article.author)) {
        acc[article.author] = [article._id];
      } else {
        acc[article.author].push(article._id)
      }
    }
    return acc
  }, {});
};
