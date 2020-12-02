const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = "mongodb://localhost:27017"

let db;
let col_name = 'userdata';

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//health check
app.get('/',(req,res)=>{
  res.status(200).send("Health Ok")
});

//get user
app.get('/users',(req,res)=>{
  var query = {}
  // if(req.query._id){
  //   query = {_id:Number(req.query._id)}
  // }else{
  // query = {city:'Sambalpur'}
  // }
  db.collection(col_name).find().toArray((err,result)=>{
    if(err) throw err
    res.status(200).send(result);
  });
});

//add user
app.post('/addUser',(req,res)=>{
  db.collection(col_name).insert(req.body,(err,result)=>{
    if(err) throw err
    res.send('Data Added');
  })
})

//update user
app.put('/updateUser',(req,res)=>{
  db.collection(col_name).update(
    {_id:req.body._id},
    {
      $set:{
        name:req.body.name,
        city:req.body.city,
        phone:req.body.phone,
        isActive:true
      }
    },(err,result)=>{
      if(err){
        res.status(403).send('Error in response')
      }else{
        res.status(200).send('Data updated')
      }
    }
  )
})

//delete user
app.delete('/deleteUser',(req,res)=>{
  db.collection(col_name).remove({_id:req.body._id},(err,result)=>{
    if(err) throw err
    res.send('Data deleted')
  })
})

//connection with mongodb
MongoClient.connect(mongourl,(err,connection)=>{
  if(err) console.log(err)
  db = connection.db('mydb')
  app.listen(port,(err)=>{
    console.log(`Server is running on port ${port}`);
  });
});