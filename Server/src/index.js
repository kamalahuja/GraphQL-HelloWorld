const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Member = require('./resolvers/Member');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');


const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote,
    Member
}



const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => { return {...request, prisma } }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))