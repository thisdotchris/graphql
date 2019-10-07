# graphql

## query

```bash
query{
  cars{
    model
  }
}
```

## select query

```bash
query{
  car(model: "mazda 3"){
    _id
    model
    manufacturer{
      name
    }
  }
}
```

## mutation

```bash
mutation{
  createCar(car: {
    model: "mazda xr"
    color: "red",
    transmission: "manual"
    manufacturer: "mazda"
  }){
    model
  }
}
```
