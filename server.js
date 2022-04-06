var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

var app = express();

const uri = "mongodb+srv://admin:admin11@zijielab1.ffg6s.mongodb.net/Lab1?w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//load homepage
app.get('/', function(req, res){
	    res.sendFile(path.join(__dirname, 'index.html'), 'utf8', function (err, data) {
        if (err) throw err;
        res.end(data);
		});
});

//find all users
app.route('/users').get(async function(req, res) {
      await client.connect();
	  const collection = client.db("Lab1").collection("users");
	  const allUsers = await collection.find({}).toArray();
	  res.send(allUsers);

	  client.close();
});

//find one specific user
app.route('/users/:id').get(async function(req, res) {
      await client.connect();
	  const collection = client.db("Lab1").collection("users");
	  const query = {id: parseInt(req.params.id)};
	  const myDoc = await collection.findOne(query, {});
	  if(!myDoc) {
		  res.status(404).send('Users Not found');
	  }else{
	  res.send(myDoc);
	  }
	  client.close();
});

// Create a user
app.route('/users').post(async function(req, res) {	
      await client.connect();
	  console.log("here")
	  const collection = client.db("Lab1").collection("users");


	  const user = await collection.findOne({id: parseInt(req.body.userid)}, {});
	  if(user) {
		  res.status(409).send('User already exists');
	  } else {
		  let userDocument = {
			 "id": parseInt(req.body.userid),
			 "name": req.body.username,
			 "age": parseInt(req.body.userage),
		  }
		  // Insert a single document, wait for promise so we can read it back
		  await collection.insertOne(userDocument);
		  const allUsers = await collection.find({}).toArray();
	      res.send(allUsers);		  
	  }

	  client.close();
});

// Update a user
app.route('/users/update').post(async function(req, res) {
      await client.connect();
	  
	  const collection = client.db("Lab1").collection("users");
	  
	  const userid = parseInt(req.body.userid);
	  console.log(userid);
	  const user = await collection.findOne({id: userid}, {});
	  if(!user) {
		  res.status(404).send('User not found');
	  } else {
		  let updatedDocument = { $set: {
			 "id": userid,
			 "name": req.body.username,
			 "age": parseInt(req.body.userage),
		  }};
		  await collection.updateOne({id: userid}, updatedDocument, {});
		  const allUsers = await collection.find({}).toArray();
	      res.send(allUsers);		  
	  }

	  client.close();
});

// Delete a user
app.route('/users/delete').post(async function(req, res) {
      await client.connect();
	  
	  const collection = client.db("Lab1").collection("users");
	  
	  const userid = parseInt(req.body.userid);
	  console.log(userid);
	  const user = await collection.findOne({id: userid}, {});
	  if(user){
		  await collection.deleteOne({id: userid}, {});
		  const allUsers = await collection.find({}).toArray();
	      res.send(allUsers);		  
	  } else {
		  res.status(404).send('User not found');
	  }

	  client.close();
});



var server = app.listen(3000, () => {
	console.log(`Lab1 app listening on port 3000`);
});