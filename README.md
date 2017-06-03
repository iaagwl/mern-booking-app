## MER\(R\)N GYM CLASS BOOKING APPLICATION

A gym class booking app built with techniques such as MongoDB, Express, React, Redux and NodeJS.
Sign up and apply for classes or take the role as an administrator and manage the classes and attendees.
The client part of the application is built using Create React App. The server is built separately
from the client and the client requests are being proxied in the client package.json file.

#### Setup
To run the application locally you will need to install and run MongoDB. For this, I recommend you to follow the instructions on the official MongoDB website.

1. cd into server folder and install dependencies and run the server
```
cd server
npm install
npm start
```
This will also create an initial admin user with username: admin, email: admin@admin.admin, password: admin

2. cd into client folder and install dependencies and run the client
```
cd ../client
npm install
npm start
```

#### Get Started
Go to localhost:3000
If everything is setup correctly, there should already exist an administrator account. Log onto it with the following Credentials: `username: admin , email: admin@admin.admin , password: admin`.

Go to the Admin tab to create a new class or the Classes tab to view and apply for classes. Admin users aren't allowed to apply for classes, to create a new account, logout and go to the Signup tab and follow instructions. When someone has applied for a class, you can view these as an administrator by going to the Classes tab and click the Info / Edit button underneath the class.
