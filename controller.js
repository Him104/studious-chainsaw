const userModel = require("./model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const s3 = require('./aws')

exports.register = async (req, res) => {
  try {
   console.log('Request body:', req.body); // Add this to debug

    const { name, email, password, age } = req.body;

    if(!name || !email || !password || !age){

      return res.status(400).send({message: "Name, email and password are required"})
    }
    console.log("request body", req.body)
    const existingUser = await userModel.findOne({ email })
    console.log("exisitng user", existingUser)
    if (existingUser) {
      console.log("user already exists", existingUser)
      return res.status(400).send({ message: "user already exists", })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashed password", hashedPassword)

    const createUser = await userModel.create({ name, email, password: hashedPassword, age });
    console.log("creating user", createUser)

    console.log(" user created", createUser);

    res
      .status(201)
      .send({ message: "User created successfully", data: createUser });
  } catch (error) { }
};

exports.login = async(req, res) => {
  try {

const {email, password} = req.body

if (!email || !password) {
  return res.status(400).json({
      message: "Email and password are required"
  });
}



const findUser = await userModel.findOne({email})

if(!findUser) {
  return res.status(401).send({message: "user not found"})
}

const isMatch = await bcrypt.compare(password, findUser.password)

if(!isMatch){

  return res.status(401).send({message: "Invalid credentials"})
}

const token = jwt.sign({userId: findUser._id, email: findUser.email}, process.env.SECRET_KEY, {expiresIn: "1h"})


return res.status(200).send({message: "Login successful", token} )


    
  } catch (error) {

    console.error(error)

    res.status(500).send({ message: "Internal server error", error })
    
  }

}


exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params
    console.log(userId);


    const findUser = await userModel.findById(userId);

    console.log(findUser)
    res
      .status(200)
      .send({ message: "user data fetched successfully", data: findUser });
  } catch (error) {
    console.log(error);
  }
};


exports.getUsersByName = async (req, res) => {
  try {
    const { name } = req.query


    if (!name) {
      return res.status(400).send({ message: "Name is required" })
    }
    const findUser = await userModel.findOne({ name: name }).lean();

    if (!findUser) {
      return res.status(404).send({ message: "user not found" })
    }

    console.log(findUser)
    res
      .status(200)
      .send({ message: "user data fetched successfully", data: findUser });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {

  try {


    const findAllUsers = await userModel.find({ isDeleted: false });

    const totalUsers = await userModel.countDocuments({ isDeleted: false });



    return res.status(200).send({ message: "all users fetched successfully", data: findAllUsers, count: totalUsers })


  } catch (error) {

    res.status(500).send({ message: "Internal server error", error })

  }
}

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).send({ message: "Name, email and password are required" })
    }

    const userUpdate = await userModel.findByIdAndUpdate(userId, { name, email, password }, { new: true })

    if (!userUpdate) {
      return res.status(404).send({ message: "user not found" })
    }

    return res.status(201).send({ message: "user data updated successfully", data: userUpdate })

  } catch (error) {

    res.status(500).send({ message: "Internal server error", error })

  }

}


exports.updateUserByName = async (req, res) => {
  try {
    const { name, email } = req.query
    const updatedData = req.body;

    if (!name && !email) {
      return res.status(400).send({ message: "Name and email are required" })
    }

    const updatedUser = await userModel.findOneAndUpdate({ $or: [{ name: name }, { email: email }] },
      { $set: updatedData },
      { new: true })

    if (!updatedUser) {
      return res.status(404).send({ message: "user not found" })
    }

    return res.status(201).send({ message: "user data updated successfully", data: updatedUser })

  } catch (error) {

    console.log(error)


    return res.status(500).send({ message: "Internal server error", error })

  }

}

exports.updateUserByEmail = async (req, res) => {
  const { userId } = req.params
  const updatedData = req.body;
  try {


    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData,
      { new: true, runValidators: true })

    if (!updatedUser) {
      return res.status(400).send({ message: "user not found" })
    }


    return res.status(201).send({ message: "user data updated successfully", data: updatedUser })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {

  const { userId } = req.params
  try {
    const user = await userModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });

    if (!user) {
      return res.status(400).send({ message: "user nahi mila" })
    }

    const remainingUsers = await userModel.countDocuments({ isDeleted: false })

    return res.status(200).send({ message: "user has been deleted successfully", deletedUser: user, count: remainingUsers })


  } catch (error) {

    res.status(500).send({ message: "Internal server Error", message: error.message })

  }
}


exports.filterByAge = async (req, res) => {
  try {

    const users = await userModel.find({ age: { $gt: 20 } })

    if(users.length === 0) {
      console.log("no users found")
    }

    return res.status(200).send({ message: "users filtered successfully", data: users })  
    
  } catch (error) {
    res.status(500).send({ message: "Internal server Error", message: error.message })
  }
}

exports.store = async (req, res) => {

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      age: 25,
      city: 'Noida'
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      age: 30,
      city: 'Jaipur'

    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      password: "password789",
      age: 35,
      city: 'Delhi'

    },
    {
      name: "Alice Williams",
      email: "alice@example.com",
      password: "passwordabc",
      age: 28,
      city: 'Jhansi'  
    },
    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: "passwordxyz",
      age: 22,
      city: 'Bareilly'
    },
    {
      name: "Himanshu",
      email: "him@example.com",
      password: "passwordxyz",
      age: 22,
      city: 'Noida'
    }
  ];
  
  try {

   const storeData= await userModel.insertMany(users)

    res.status(201).json({message: "users stored successfully", data: storeData})
    
  } catch (error) {
    res.status(500).json({error: error.message})
    
  }
}


exports.groupByCity = async (req, res) => {
  try {
    
const data = await userModel.aggregate([

{  $group: { _id: "$city",
    count: { $sum: 1 }
  }
}])

res.status(200).send({message: "data grouped successfully", data})

  } catch (error) {
    res.status(500).send({error: error.message})
  }
}


exports.averageAge = async (req, res) => {
  try {

    console.log("catch block")
    const data = await userModel.aggregate([
{ $group: { _id: null, averageAge: { $avg: '$age'}}
  
},

    ])
console.log(data)
    res.status(200).json({data})
    
  } catch (error) {

    res.status(500).send(error.message)
    
  }
}


exports.filerAndSort = async (req, res) => {
  try {

    const data = await userModel.aggregate([

{ $match: { age: { $gt: 20 } } },
{ $sort : {age: 1}}


    ])

    res.status(200).send({message: "response returned", data: data})
    
  } catch (error) {

    res.status(500).send(error.message)
    
  }
}


exports.uploadFile = async(req, res) => {

  try {

    const file = req.file;

    if(!file) {
      return res.status(400).send("Please upload a  file");
    }

    const result = await s3.uploadFile(file);

    console.log("File uploaded", result)
    
  } catch (error) {
    console.log(error)
  }


}