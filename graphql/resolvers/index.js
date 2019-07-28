module.exports = {
    cars: async () => {
        return cars;
    },
    createCar: async (args) => {
        let new_car = args.car;
        new_car._id = Math.random().toString();
        cars.push(new_car);
        return new_car;
    }
}