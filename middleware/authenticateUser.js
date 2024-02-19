const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    // Get token from header
    let token = req.headers.authorization;

    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No Token Provided." });

    // Verify the token
    await jwt.verify(
      token.split(" ")[1],
      process.env.TOKEN_SECRET,
      function (err, decoded) {
        if (err) {
          console.log("Invalid Token");
          return res
            .status(500)
            .send({ auth: false, message: "Not an authorised user." });
        } else {
          // If everything is good, save to request for use in other routes
          req.body = decoded;
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticateUser;
