import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const signUpBodyValidation = (body) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		lname: Joi.string().required(),
		password: Joi.string().min(6).required(),
		userRole: Joi.string(),
		date: Joi.date()

	});
	return schema.validate(body);
};

const logInBodyValidation = (body) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().trim().required().label("Password"),
	});
	return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
	const schema = Joi.object({
		refreshToken: Joi.string().required().label("Refresh Token"),
	});
	return schema.validate(body);
};

export {
	signUpBodyValidation,
	logInBodyValidation,
	refreshTokenBodyValidation,
};