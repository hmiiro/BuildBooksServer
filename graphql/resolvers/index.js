const billResolvers = require('./bills');
const usersResolvers = require('./users');
const itemResolvers = require('./items');

module.exports = {
  Query: {
    ...billResolvers.Query,
    ...itemResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...billResolvers.Mutation,
    ...itemResolvers.Mutation,
  },
};
