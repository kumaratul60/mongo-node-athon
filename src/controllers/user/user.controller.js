import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromises } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";



const registerUser = asyncHandlerPromises(async (req, res) => {
	// get user details from frontend
	// validaton - not empty
	// check for images,  check for avatar
	// check them to cloudinary, avatar
	// create user object - create entry in db
	// remove password and refresh token field from response
	// return res (mapper)
	const { fullName, userName, email, password } = req.body;
	// console.log({ fullName, userName, email, password });

	if ([fullName, userName, email, password].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}

	// find user exist in db or not based on email or username
	const existingUser = User.findOne({
		$or: [{ email }, { userName }]
	});

	if (existingUser) {
		throw new ApiError(409, "User with email or username already exists");
	}

	// multer user's file access
	const avatarLocalPath = req.files?.avatar[0]?.path;
	const coverImageLocalPath = req.files?.coverImage[0]?.path;

	if (!avatarLocalPath) {
		return new ApiError(400, "Avatar file is required");
	}

	// await beacuse want to optionally intentionally wait till not upload successfully
	const cloudinaryAvatarUpload = await uploadOnCloudinary(avatarLocalPath);
	const cloudinaryCoverImgUpload = await uploadOnCloudinary(coverImageLocalPath);

	if (!cloudinaryAvatarUpload) {
		return new ApiError(400, "Avatar file is required");
	}

	// not checking cloudinaryCoverImgUpload, because not required at this point

	const createUser = await User.create({
		fullName,
		avatar: avatar.url,
		coverImage: coverImage?.url || "",
		userName: userName.toLowerCase(),
	});

	// select(), it takes arguments which we don't want with - sigin
	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(500, "Something went wrong while registering user");
	}

	// return res.status(200).json(createdUser);
	return res.status(201).json(
		new ApiResponse(200, createUser, "user created successfully")
	);


});

export { registerUser };

