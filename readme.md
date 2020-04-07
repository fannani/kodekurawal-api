
# Kodekurawal API

## Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
### Prerequisites
* Git https://git-scm.com/
* NodeJs https://nodejs.org/
* Yarn https://yarnpkg.com/
* MongoDB https://www.mongodb.com/
* Docker https://www.docker.com/ (Only if using docker for development environment)
### Installing
1. Clone this repo to your local machine
    ```
    git clone https://github.com/fannani/kodekurawal-api.git
    ```
2. Copy .env.example file to .env on the root folder. You can type `copy .env.example .env` if using command prompt Windows or `cp .env.example .env` if using terminal, Ubuntu.
3. Open your .env file and change the environment to whatever you have, 
   By default, the server url and the api url is the production api and you can leave it.
5. Run `yarn codegen` to geneate resolver type definition file
### Running app using local environment
1. Install all package dependency using command `yarn` 
2. Run `yarn run dev` to start the app
3. Go to `localhost:4000` 
#### Running app using docker enviroment
1. run `docker compose up` to run docker container
2. Go to `localhost:4000` 
   
## Deployment 
### Using current server
Just push to branch master and Travis CI/CD automatic build and deploy your app
```
git add .
git commit -m "commit message"
git push origin master
``` 
### Using VPS
1. Push source code to the server
2. Configure `.env` file
3. `yarn build` creates a build directory with a production build of your app
4. run `yarn start` to start the server
### Using Heroku
1. Sign up For Heroku https://www.heroku.com/
2. Create Heroku Git Repository
   - install heroku-cli https://devcenter.heroku.com/articles/heroku-cli
   - type `heroku login` to cmd
   - type `heroku create` (You should see two links after running this command. Copy the second one)
   - type  `git remote add heroku PASTE THE LINK YOU JUST COPIED`
   - type `git push heroku master` to push source code to server
   - Once you run the last command Heroku will start to run some tests on your app. If everything goes right you should see a successful deploy message. Now you’re able to navigate to your app by running: `heroku open`
### Using docker
1. Push source code to the server
2. Configure `.env` file
3. run `docker-compose -f docker-compose.prod.yml up -d`

## Built With
* [GraphQL](https://graphql.org/) - Graphql Server Library
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Graphql Server Library
* [Yarn](https://yarnpkg.com/) - Dependency Management
* [Typescript](https://www.typescriptlang.org/) - Programming Language
* [Mongoose](https://mongoosejs.com/) - MongoDB ORM
* [ExpressJS](https://expressjs.com/) - NodeJS Framework


## Versioning
We use SemVer for versioning, see https://semver.org/ for the detail

## Project Directory
    .
    ├── ...
    ├── src                       # Source files 
    │   ├── config                # Configuration files
    │   ├── generated             # Generated files (schema.graphql)
    │   ├── models                # Database Model
    |   ├── routes                # Routes definition
    |   ├── schema                # Schema Model
    |   |   ├── player            # Player Schema Model
    |   |   |   ├── typeDef.ts    # GraphQL type definition (schema)
    |   |   |   └── resolvers.ts  # GraphQL Resolvers (logic)
    |   |   └── ...
    |   ├── utils                 # Tools and utilities
    |   └── ...
    └── ...



