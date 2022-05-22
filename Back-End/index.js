const PORT =8000
const express = require('express')
const mongoose = require('mongoose')
const uri = 'mongodb+srv://NawfAbdullah:jvzWr0LqQXVI8Brt@cluster0.u5osv.mongodb.net/tech-hospital?retryWrites=true&w=majority'
const {v4:uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

mongoose.connect(uri)


app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const waitingSchema = new mongoose.Schema({patient_id:String,name:String,reason:String})

const userSchema = new mongoose.Schema({
        email:String,
        user_id:String,
        hashed_password:String,
        first_name:String,
        last_name:String,
        dob_day:String,
        dob_month:String,
        dob_year:String,
        bloodGroup:String,
        age:String,
        profile_pic:String,
        weight:String,
        height:String,
        type:String,
        doctor_id:String,
        waiting_list:[waitingSchema],
        allergic_to:String,
        prescription:String,
        meetingLink:String
    })




const User = mongoose.model("User",userSchema);



app.get('/',(req,res)=>{
	res.send("Code is running")
})

app.post('/signup',async (req,res)=>{
	const {email,password} = req.body
	console.log(email)
	console.log(password)
	const generateduserId = uuidv4();
	const hashedPassword = await bcrypt.hash(password,10)
	console.log(hashedPassword)
	user = new User({
             'email':email.toLowerCase(),
             'hashed_password':hashedPassword,
             'user_id':generateduserId
            })
  
    User.exists({'email':email}, function (err, doc) {
        if (err){
            console.log(err)
        }else{
                if(doc){
                    res.status(409).send('user exist')
                }else{
                    user.save()
                    console.log('added')
                     const token = jwt.sign({
		             'email':email.toLowerCase(),
		             'hashed_password':hashedPassword,
		             'user_id':generateduserId
		            },email.toLowerCase(),{
		    						expiresIn:60*24
		    					})
                    res.status(201).json({token,userId:generateduserId})
                  
                    }
                }
            });


})



app.post('/login',async (req,res)=> {
	const {email,password} = req.body
	console.log(password)
	User.findOne({'email':email},(err,user)=>{
		if(err){console.log(err)}else{
			if(user){
				bcrypt.compare(password,user.hashed_password,(err,isValid)=>{
					if(!err){
					if(isValid){
						console.log(user)
						 const token = jwt.sign({
			             'email':user.email,
			             'hashed_password':user.hashed_password,
			             'user_id':user.user_id
			            },user.email.toLowerCase(),{
			    				expiresIn:60*24
		    			})
						console.log('token: ',token)
						res.status(201).send({token,userId:user.user_id,email:user.email})
					}else{
						console.log('Invalid')
						res.status(201).send({error:'invalid credentials'})
					}}else{
						console.log(err)
					}

				})
			}else{
				res.send({thethingis:'not exist'})
			}
		}
	})
})


app.get('/user',async (req,res)=>{
	const userId = req.query.userId
	User.find({user_id:userId},(err,user)=>{
		res.send(user)
	})
})

app.put('/user',async (req,res)=>{
	const formData = req.body.formData
	console.log(formData)
	User.updateOne({user_id:formData.user_id}, formData,{new: true},(err,user)=>{
		if(!err){
			res.status(200).send(user)
		}else{
			console.log(err)
			res.status(500).send(err)
		}
	});
})



app.put('/waiting/:patient_name/:patient_id/:reason',(req,res)=>{
	const name = req.params.patient_name
	const patient_id = req.params.patient_id
	const reason = req.params.reason
	console.log(req.params)
	User.findOne({user_id:'a856d6a3-632d-4db7-98b8-ea85e83c642a'},function(err,user){
      user.waiting_list.push({patient_id:patient_id,name:name,reason:reason});
      user.save(err=>{
      	if(err){
      		console.log(err)
      	}else{
      		console.log('successfully')
      		res.send({query:'request is sent to your doctor'})
      	}
      });
    });
});

app.put('/meetinglink',(req,res)=>{
	const link = req.body.link
	const patient_id = req.body.patient_id
	User.findOne({user_id:patient_id},function(err,user){
      user.meetingLink = link
      user.save(err=>{
      	if(err){
      		console.log(err)
      	}else{
      		console.log('successfully')
      		res.send({query:'Doctor is in'})
      	}
      });
    });
});

app.put('/dismiss/:patient_name/:patient_id',(req,res)=>{
	const name = req.params.patient_name
	const patient_id = req.params.patient_id
	console.log(req.params)
	User.findOne({user_id:'a856d6a3-632d-4db7-98b8-ea85e83c642a'},function(err,user){
      user.waiting_list.filter((item)=>{return item.patient_id!=patient_id})
      user.save(err=>{
      	if(err){
      		console.log(err)
      	}else{
      		console.log('successfully')
      		res.send({query:'request is sent to your doctor'})
      	}
      });
    });
});

app.put('/prescription/:patient_id',(req,res)=>{
	const patient_id = req.params.patient_id
	const prescription = req.body.prescription
	console.log(patient_id)
	User.findOne({user_id:patient_id},function(err,user){
      user.prescription = prescription
      user.save(err=>{
      	if(err){
      		console.log(err)
      	}else{
      		console.log('successfully')
      		res.send({query:'Updated'})
      	}
      });
    });
})

app.listen(PORT,()=>{
	console.log('Server started at ',PORT)
})