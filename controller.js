const userModel = require("./model");

exports.register = async (req, res) => {
  try {
    console.log("entered in controller function");
    const { name, email, password } = req.body;

    console.log("creating user");

    const createUser = await userModel.create({ name, email, password });

    console.log(" user created", createUser);

    res
      .status(201)
      .send({ message: "User created successfully", data: createUser });
  } catch (error) { }
};


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


    if(!name){
      return res.status(400).send({message: "Name is required"})
    }
    const findUser = await userModel.findOne({ name: name }).lean();

    if(!findUser){
      return res.status(404).send({message:"user not found"})
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
    

  const findAllUsers = await userModel.find();

  return res.status(200).send({message: "all users fetched successfully", data: findAllUsers})
  

} catch (error) {

  res.status(500).send({message: "Internal server error", error})
    
}
}

exports.updateUser = async (req, res) => {
try {
  const {userId} = req.params
  const { name, email, password } = req.body;

  if(!name && !email && !password){
    return res.status(400).send({message: "Name, email and password are required"})
  }

const userUpdate = await userModel.findByIdAndUpdate(userId,  { name, email, password }, {new: true})

if(!userUpdate){
  return res.status(404).send({message: "user not found"})
}

return res.status(201).send({message: "user data updated successfully", data: userUpdate}) 

} catch (error) {

  res.status(500).send({message: "Internal server error", error})
  
}

}


exports.updateUserByName = async (req, res) => {
  try {
    const {name, email} = req.query
    const updatedData= req.body;
  
    if(!name && !email){
      return res.status(400).send({message: "Name and email are required"})
    }
  
  const updatedUser = await userModel.findOneAndUpdate({$or: [{name: name}, {email: email}]},
     {$set: updatedData},
      {new: true})
  
  if(!updatedUser){
    return res.status(404).send({message: "user not found"})
  }
  
  return res.status(201).send({message: "user data updated successfully", data: updatedUser}) 
  
  } catch (error) {

    console.log(error)
  
  
   return  res.status(500).send({message: "Internal server error", error})
    
  }
  
  }
  
  
  
  



