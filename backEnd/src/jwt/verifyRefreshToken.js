import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";

// Function to verify the validity of a refresh token
const verifyRefreshToken = (refreshToken) => {
	const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

	return new Promise((resolve, reject) => {
		// Finding a UserToken document that matches the provided refresh token
		UserToken.findOne({ token: refreshToken }, (err, doc) => {
			if (!doc)
				return reject({ error: true, message: "Invalid refresh token" });

			// Verifying the refresh token using the private key
			jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
				if (err)
					return reject({ error: true, message: "Invalid refresh token" });
				resolve({
					tokenDetails,
					error: false,
					message: "Valid refresh token",
				});
			});
		});
	});
};

export default verifyRefreshToken;