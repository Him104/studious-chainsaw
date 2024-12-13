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
  } catch (error) {}
};


exports.getUser = async (req, res) => {
  try {
  const {userId} = req.params
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
