### Requirements
- Node.js v16.3.0 or higher
- NPM v7.15.1 or higher

### Install Node.js and NPM on Ubuntu 18.04 or higher

```bash
$ sudo apt-get update
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
$ nvm install 16.3.0
```

### Installing MM-DIRECT_monitoring

```bash
$ git clone https://github.com/ManoelRochadev/MM-DIRECT_monitoring.git
$ cd MM-DIRECT_monitoring
```

Install the dependencies with the following command:
```bash
$ npm install
```

### Configuring MM-DIRECT_monitoring

Modify the **config.json** file and select the location where the MM-DIRECT path is located from the user’s home.

Configuring the config.json File Open the config.json file in a text editor and adjust the value of the key corresponding to the MM-DIRECT path. Make sure to provide the correct path to ensure that monitoring works correctly

```json
{
  "path": "/MM-DIRECT"
}
```

### Running MM-DIRECT_monitoring

Execution Start the application with the following command:
```bash
$ npm start
```

The terminal will display the route to which you can access to interact with the monitoring.

Accessing the Route After starting the application, access the route indicated in the terminal. This can be done by typing the provided address into a web browser. Make sure that the server is running and ready to receive connections.
