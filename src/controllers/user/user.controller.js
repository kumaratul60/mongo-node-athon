import { asyncHandlerPromises } from "../../utils/asyncHandler.js";


const registerUser = asyncHandlerPromises(async (req, res) => {
	 res.status(200).json({
		message: "ok"
	});
});

export { registerUser };

