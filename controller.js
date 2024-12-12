const userModel = require('./model')

exports.register = async (req, res) => {
  try {
    console.log("entered in controller function");
    const { name, email, password } = req.body;

    console.log("creating user");

    const createUser = await userModel.create({ name, email, password });

    console.log(" user created");

    res
      .status(201)
      .send({ message: "User created successfully", data: createUser });
  } catch (error) {}
};
