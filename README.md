# Readable Project

This is my Readable React + Redux project for Udacity's React NanoDegree. The particular project encompasses a "Comment" type application which is managed by Redux in part with React. The application also utilizes an Express Backend server which act as the application End Point API. This API doesn't pull from a database and relies more on the users localStorage in their browser.

The Application has several features split between Posts and Comments. Seeing as the application doesn't pull from a 3rd party, all of the data represented is siloed for the individual user thus control and administrative access is wide open. This give each user the ability to create, delete, edit, and vote on each comment and post within the application. Each particular Post is given its own designated page which lists out comments while each category for the application is also given its own page.

## How to get started Developing

There are two parts in which to split up to get the app running on your local machine. I've broken those out below. If you follow these steps exactly. From file to file, everything should start up correctly :+1:

## Clone the App & Install Initial Dependencies
```sh
https://github.com/alexnitro/React_Readable.git

cd React_Redable

npm install

```
## Install Server Dependencies & Start the Node Server
```sh
cd React_Readable/api-server

npm install

node server
```
## Install the App Dependencies & Start the App
```sh
cd React_Readable/frontend

npm install

npm start
```


## API Server
Information about the API server and how to use it can be found in its [README file](api-server/README.md).
