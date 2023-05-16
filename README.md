# Wiki-Api

### RESTful API

### Technologies used: Node.js, Express, body-parser, mongoose, mongoDB, Robo 3T, Postman

## Required software

- Docker
- Node.js
- Nodemon

## To run the application

From command line
 
```bash
 git clone https://github.com/ljenchik/wiki-api.git
 docker run -d -p 27017:27017 --name test-mongo mongo:latest
 npm install
 nodemon app.js
```


This project is based on the guidance and steps provided by Angela Yu's Udemy <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125215#questions/18744410"> 
"The Complete 2023 Web Development Bootcamp"</a>. However, I have enhanced its functionality by adding the ability to update and delete blog posts.
