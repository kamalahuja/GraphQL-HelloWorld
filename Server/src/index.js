const { GraphQLServer } = require('graphql-yoga')


let links = [{
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for graphQL'
    }

]

let idCount = links.length;


const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,

        link: (parent, args) => {

            for (let counter = 0; counter < links.length; counter++) {
                if (links[counter].id === args.id) {
                    return links[counter];
                }
            }
            return null;
        }
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link;
        },
        updateLink: (parent, args) => {
            for (let counter = 0; counter < links.length; counter++) {
                if (links[counter].id === args.id) {
                    links[counter].description = args.description;
                    links[counter].url = args.url;
                    return links[counter];
                }
            }
            return null;
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))