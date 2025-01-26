const users = require("../db/models/users");
const userType = require("../db/models/user_type"); // Import user_type model
const { success_function, error_function } = require("../utils/responseHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log("email:", email);

        // Step 1: Attempt to find the user by email
        let user = await users.findOne({ email }).populate("user_type");
        console.log("user:", user);

        if (user) {
            // Compare passwords
            const passwordMatch = bcrypt.compareSync(password, user.password);
            console.log("passwordMatch:", passwordMatch);

            if (passwordMatch) {
                const _id = user._id;
                const userType = user.user_type;

                // Assign token expiration based on user type
                let tokenExpiry;
                if (userType._id.toString() === "67932c9018ec5aaa81754e19") { // Admin
                    tokenExpiry = "30d";
                } else { // Buyer or Seller
                    tokenExpiry = "10d";
                }

                const token = jwt.sign({ user_id: _id, user_type: userType.user_type }, process.env.PRIVATE_KEY, { expiresIn: tokenExpiry });
                const data = {
                    token: token,
                    _id,
                    user_type: userType.user_type,
                };

                const response = success_function({
                    statusCode: 200,
                    data,
                    message: `${userType.user_type} login successful`,
                });

                return res.status(response.statusCode).send(response);
            } else {
                return res.status(400).send(error_function({
                    statusCode: 400,
                    message: "Invalid password",
                }));
            }
        }

        // If no user is found
        return res.status(400).send(error_function({
            statusCode: 400,
            message: "User not found",
        }));
    } catch (error) {
        console.error("error:", error);
        return res.status(500).send(error_function({
            statusCode: 500,
            message: error.message || "Something went wrong",
        }));
    }
};
