const carModel = require('../../models/cars');
const manufacturerModel = require('../../models/manufacturers');

async function _manufacturer(id) {
    const manufacturer = await manufacturerModel.findOne({ _id: id });
    manufacturer.cars = await _cars(manufacturer.cars);
    return manufacturer;
}

async function _cars(ids) {
    const cars = await carModel.find({ _id: { $in: ids } });
    return cars;
}

module.exports = {

    car: async (args) => {
        const car = await carModel.findOne(args);
        return {
            ...car._doc,
            manufacturer: _manufacturer.bind(this, car.manufacturer)
        };
    },

    cars: async () => {
        const cars = await carModel.find({});
        return cars.map(car => {
            return {
                ...car._doc,
                manufacturer: _manufacturer.bind(this, car.manufacturer)
            }
        })
    },

    manufacturers: async () => {
        const manufacturers = await manufacturerModel.find({});
        return manufacturers.map(async manufacture => {
            return {
                ...manufacture._doc,
                cars: _cars.bind(this, manufacture.cars)
            }
        });
    },

    createCar: async (args) => {
        const findManufacturer = await manufacturerModel.findOne({ name: args.car.manufacturer });
        if (!findManufacturer) {
            throw new Error('cannot find manufacturer.');
        }
        args.car.manufacturer = findManufacturer.id;
        const findCar = await carModel.findOne({ model: args.car.model });
        if (findCar) {
            throw new Error('car already exist.');
        }
        const newCar = await carModel.create(args.car);
        await manufacturerModel.update({ _id: findManufacturer._id }, { $push: { cars: newCar._id } });
        newCar.manufacturer = findManufacturer;
        return newCar;
    },

    createManufacturer: async (args) => {
        const newManufacturer = await manufacturerModel.create(args.manufacturer)
        return newManufacturer;
    }
}