# Readable Project

This is my Readable React + Redux project for Udacity's React NanoDegree. The particular project encompasses a "Comment" type application which is managed by Redux in part with React. The application also utilizes an Express Backend server which act as the application End Point API. This API doesn't pull from a database and relies more on the users localStorage in their browser.

The Application has several features split between Posts and Comments. Seeing as the application doesn't pull from a 3rd party, all of the data represented is siloed for the individual user thus control and administrative access is wide open. This give each user the ability to create, delete, edit, and vote on each comment and post within the application. Each particular Post is given its own designated page which lists out comments while each category for the application is also given its own page.

## How to get started Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
