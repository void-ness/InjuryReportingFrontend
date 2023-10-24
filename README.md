## Introduction
An injury tracking system. It allows the users to login/signup and enter information about the injuries reported by other persons. By allowing CRUD operations along with filtering options, it makes the task of organising injury reports a breeze.

## Features Covered 
- [x] Login/SignUp into the application using inbuilt authentication
- [x] Create New reports and View already created reports in the form of a table
- [x] - Update & Delete Existing reports
- [x] - Search for reports on the basis of reporter name
- [x] - sort existing reports on the basis of reporter name, injury datetime, report creation datetime 

## Features Pending
- [ ] - Add injury details using the bodymap 
- [ ] - Use Auth0 for authentication into the system

<br />

*Note: While backend server supports the functionality to filter data by providing a user defined start-date and end-date, the frontend currently lacks the implementation for the same* 

## Technologies Used
**Frontend:**
- React.js
- Grommet Designing Library
- Apollo Client (For graphql) 
- React-router-dom - for bulding a SPA and quick client side navigation

**Backend:** 
A graphql based server to handle incoming requests and serve data.
- ApolloServer - a graphql compliant web server
- Prisma - for database connectivity
- Database - MongoDB
- Bcrypt and JWT - for authentication purposes

**Backend code:** [link](https://github.com/void-ness/InjuryReportingBackend)

*Note: Before running the project locally you need to create a `.env` file. A template for the same can be found in `example.env`* 

Demo Credentials to login into the app:
email - demo
password - demo
