const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type Car {
            _id: ID
            model: String!
            color: String!
            transmission: String!
        }

        type Manufacturer {
            _id: ID
            name: String!
            country: String
        }

        input CarInput {
            model: String!
            color: String!
            transmission: String!
        }

        input ManufacturerInput {
            name: String!
            country: String!
        }

        type RootQuery {
            cars: [Car!]!
            manufacturers: [Manufacturer!]!
        }

        type RootMutation {
            createCar(car: CarInput): Car
            createManufacturer(manufacturer: ManufacturerInput): Manufacturer
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `
);