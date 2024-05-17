import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

// Function to generate access and refresh tokens for a given user
const generateTokens = async (user) => {
	try {
		const payload = { userId: user._id,email: user.email, roles: user.userRole };

		// Function to generate access and refresh tokens for a given user
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "5s" }
		);

		// Generating refresh token with a longer expiration time of 30 days
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);

		// Checking if there is already a token stored for this user
		const userToken = await UserToken.findOne({ username: user.username });
		if (userToken) {
		
			await userToken.remove();
			await new UserToken({ userId: user._id, token: refreshToken }).save();
			return Promise.resolve({ accessToken, refreshToken })
		}
else{
	await new UserToken({ userId: user._id, token: refreshToken }).save();
		return Promise.resolve({ accessToken, refreshToken });
	}
	} catch (err) {
		return Promise.reject(err);
	}
};

export default generateTokens;