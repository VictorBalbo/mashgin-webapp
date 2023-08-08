# Simple Checkout System
This project is part of Mashgin Software Engineer assignment.

You can access the deployed projecy on https://mashgin.victorbalbo.com/ hosted by Vercel.


## Technologies used
- `vue 3` as main framework
- `vue-router` for routing
- `Pinia` for state management between components
- `TypeScript` for variables typing
- `PrimeVue` for basic components
- `sass-loader` as extension language for CSS 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Dependency
This project depends on a backend api running. The project for the backend api can be found [here](https://github.com/VictorBalbo/mashgin-api). Also the published API can be found at https://mashgin-api.victorbalbo.com/.

If needed to change the url for the api, you can change the default value for the variable `serverUri` on the file `src/constants.ts`; Or create a `.env` file defining the variable value like the exempla bellow:
```sh
VITE_SERVER_URI=http://localhost:3000
```

## Project Setup
This project can run in two ways, using `Docker` or using `Node` commands

### Docker
#### Build Image
```sh
docker build . -t mashgin-webapp
```
#### Run Image as Container
```sh
docker run -p 8080:80 mashgin-webapp
```
This will run the webapp locally though `Docker` using port 8080. The app will run on http://localhost:8080/

### Node CLI
#### Install Project Dependencies
```sh
npm install
```
### Compile and Hot-Reload for Development
```sh
npm run dev
```
This will run the webapp locally using port 8080 (if the port is already been used, the next available port will be used). To make sure wich port will be used, check the output of the `npm run dev` command.


## What this WebApp do
This WebApp fetches a menu from the [Mashgin API project](https://github.com/VictorBalbo/mashgin-api), display the menu itens as cards, allows user to add itens to the cart and to checkout the cart, simulating a e-comerce flow. The cart items are stored locally.
