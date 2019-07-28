const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schemas');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(
    '/api/v1',
    expressGraphql({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
)

app.use(
    '/',
    (req, res, next) => {
        res.send({ message: 'api running' });
    }
)

const connect = `mongodb+srv://test_user:pZp9DrsfwtNyVWfw@cluster0-z4g3b.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connect, { useNewUrlParser: true })
    .then(() => {
        console.log(`mongoose connection OK.`);
        app.listen(8080, () => {
            console.log(`server running`);
        });
    })
    .catch(error => console.error(error));