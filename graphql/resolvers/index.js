const billResolvers = require('./bills');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  //   Bill: {
  //     likeCount: parent => parent.likes.length,
  //     commentCount: parent => parent.comments.length
  //   },
  Query: {
    ...billResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...billResolvers.Mutation
    // ...commentsResolvers.Mutation
  },
  Subscription: {
    ...billResolvers.Subscription
  }
};
