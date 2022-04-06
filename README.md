# DA219a_lab1

Run the app:
Type: "npm run dev" to run app in dev mode.
Type: "npm run start" to run the app in node mode. 
Entry point is server.js.

Different URLs
The app runs on http://localhost:3000 with html user interface of front end.

There are urls for testing purposes at the backend, these are api endpoints:

http://localhost:3000/users GET request will fetch all users from database
http://localhost:3000/users POST request will create a new user based on post data with json format to database
http://localhost:3000/users/:id GET will return the object of user by ID
http://localhost:3000/users/delete POST request will delete the user by ID
http://localhost:3000/users/update POST request will update the user by ID
