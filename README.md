#### Travis CI Badge

[![Build Status](https://travis-ci.com/csci312-s21/project-amber-ayeaye.svg?branch=main)](https://travis-ci.com/csci312-s21/project-amber-ayeaye)

#### Application Information

This application will serve as a new website for the WRMC radio station. The current website is run through WordPress and although many of the features in the current website will remain in this application they will be implemented in React and streamlined for easier use by listeners, DJs, and WRMC board members. This application will also address the troubling fact that any Middlebury student can edit the WRMC WordPress site without being affiliated with the radio station.

#### Heroku Link

https://project-amber-ayeaye.herokuapp.com/

#### Running development server
After cloning the reposity, add the environment variables. Then, run the following commands:<br/>
`npm install`<br/>
`npx knex migate:latest`<br/>
`npx knex seed:run`<br/>
`export PORT=3000`<br/>
`npm run build`<br/>
`npm start`<br/>
