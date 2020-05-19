# Akira
A small Pit Timer web server.

## Requirements

The Node.js runtime is required to execute the server.
[node.js v12.16.3](https://nodejs.org/dist/v12.16.3/)

## Getting Started

After installing the Node.js, you can execute the application.
Jump into the directory where the server.js file is located and execute the following command:
```
node server.js
```

## Config

The data.json file needs to be edited.

```json
{
    "groupe_count": 1,
    "group": [
      {
        "journeys_count": 2,
        "journey_times": [
          {
            "start": "May 18, 2020 00:35:00",
            "end": "May 20, 2020 00:40:00"
          },
          {
            "start": "May 20, 2020 23:20:00",
            "end": "May 20, 2020 23:30:00"
        }
      ]
    }
  ]
}

```

## Built With

* [Node.js](https://nodejs.org/) - Runtime for JavaScript
* [Express](https://expressjs.com/) - Node.js web framework
* [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) - CSS framework

## Authors

* **Ryan** - [Polaceka](https://github.com/Polaceka)

See also the list of [contributors](https://github.com/Polaceka/Akira/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details