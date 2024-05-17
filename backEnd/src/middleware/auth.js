import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	const token = req.headers.authorization
	// console.log("token from backakend",token)
	if (!token)
		return res
			.status(403)
			.json({ error: true, message: "Access Denied: No token provided" });

			const parted = token.split(' ');
			if (parted.length === 2) {
			//	console.log("parted",parted[1])

	try {
		const tokenDetails = jwt.verify(
			parted[1],
			process.env.ACCESS_TOKEN_PRIVATE_KEY
		);
		req.user = tokenDetails;
		next();
	} catch (err) {
		if (err.message === 'jwt expired') {
		res.status(409).json({ error: true, message: "JWT token expired" })
		  }
		else{
			res.status(406).json({ error: true, message: "Access Denied: Invalid token" });
		}
	}


			}


};

export default auth;