const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type Car {
            _id: ID
            model: String!
            color: String!
            transmission: String!
            manufacturer: Manufacturer!
        }

        type Manufacturer {
            _id: ID
            name: String!
            country: String
            cars: [Car!]!
        }

        input CarInput {
            model: String!
            color: String!
            transmission: String!
            manufacturer: String!
        }

        input ManufacturerInput {
            name: String!
            country: String!
        }

        type RootQuery {
            cars: [Car!]!
            car(model: String!): Car
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