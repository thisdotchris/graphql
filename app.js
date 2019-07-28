const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schemas');
const graphqlResolver = require('./graphql/resolvers');

cars = [
    {
        _id: 'qweqw4e123rwef',
        model: 'avanza',
        color: 'red',
        transmission: 'automatic'
    }
];

const app = express();

app.use(bodyParser.json());

app.use(
    '/api',
    expressGraphql({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
)

// const connect = `mongodb+srv://test_user:pZp9DrsfwtNyVWfw@cluster0-z4g3b.mongodb.net/test?retryWrites=true&w=majority`;

// mongoose.connect(connect)
//     .then(() => {
//         console.log(`mongoose connection OK.`);
app.listen(8080, () => {
    console.log(`server listen on port 8080`);
});
    // })
    // .catch(error => console.error(error));