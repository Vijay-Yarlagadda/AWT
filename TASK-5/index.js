const express = require('express'); 
const bodyParser = require('body-parser'); 
const { MongoClient } = require('mongodb'); 
 
const app = express(); 
const port = 3900; 
const uri = 
"mongodb+srv://suresh:10pa1a1218@cluster0.kmhoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
 
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
let db; 
 
async function connectDB() { 
 try { 
   const client = new MongoClient(uri); 
   await client.connect(); 
   db = client.db('mydb'); 
   console.log("Connected to MongoDB"); 
 } catch (error) { 
   console.error("MongoDB connection error:", error); 
 } 
} 
connectDB() 
 
 
app.get("/", (req, res) => { 
 res.render("form"); 
}); 
 
app.post("/submit", async (req, res) => { 
 const { name, roll, email, branch, complaintType, description } = req.body; 
 
 console.log("\nComplaint Received:"); 
 console.log("Name:", name); 
 console.log("Roll Number:", roll); 
 console.log("Email:", email); 
 console.log("Branch:", branch); 
 console.log("Complaint Type:", complaintType); 
 console.log("Description:", description); 
 console.log("------------------------------------"); 
 
 try { 
   const complaints = db.collection('complaints'); 
   await complaints.insertOne({ 
     name : name, 
     roll : roll, 
     email: email, 
     branch: branch, 
     complaintType: complaintType, 
     description: description, 
   }); 
   res.send("Complaint submitted successfully!"); 
  } catch (err) { 
   console.error("Error inserting complaint:", err); 
   res.status(500).send("Failed to submit complaint"); 
 } 
}); 
 
 
 
 
 connectDB().then(()=>{ 
async function getData(){ 
 const complaints = db.collection('complaints'); 
  const data = await complaints.find().toArray(); 
 console.log(data); 
   } 
getData(); 
 app.get('/data', async(req,res)=>{ 
 const alldata = await getData(); 
 console.log(alldata); 
      }) 
 }) 
 
app.listen(port, () => { 
 console.log(`Server running at http://localhost:${port}`);     }); 