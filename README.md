# Currency exchange rates App with MERN stack and cRUD functionality

This is an app that provides full CRUD functionality that adds currencies with rates quoted against the euro, I used mongodb, ExpressJS, ReactJS and NodeJS.

## Backend
to run the server go to the backend directory with `cd backend` and install packages with `npm i`, now you need to connect a mongo database if you have a running database edit put the link to it in .env file if you have docker run ` docker run --name mongo -p 27017:27017 -d mongo:latest
`
now run the server by` npm start`

used software: 
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Swagger](https://www.npmjs.com/package/swagger-ui-express)
- [mongose](https://www.npmjs.com/package/mongoose)
- [nodemon](http://nodemon.io/)

To test the api go to http://localhost:5000/api-docs

## Frontend
if the backend server is running then simply write the commands `npm start` in the project home folder and it will start the website in the browser

used software:
- [ReactJS](https://reactjs.org/)
- [axios](https://github.com/axios/axios)
- [materialize](http://materializecss.com/)
- [x0popup](http://gao-sun.github.io/x0popup)