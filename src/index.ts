import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        // query variables
        // fn(parent, args, context)
        game(_: any, args: { id: string; }) {
            return db.games.find(game => game.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_: any, args: { id: string; }) {
            return db.authors.find(author => author.id === args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_: any, args: { id: string; }) {
            return db.reviews.find(review => review.id === args.id);
        }
    }
};

const server = new ApolloServer({
    // define what the graph looks like in terms of the data types and the entry points
    typeDefs, 
    // handle requests or queries for that data
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);