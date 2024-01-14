import { v2 as cloudinary } from 'cloudinary';

const ENV = process.env;

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        // file has uploaded successfully
        console.log("file is uploaded on cloundinary", response);
        return response;
    } catch (error) {
        // removed locally saved temporary file as the upload opeartion got faild
        fs.unlinkSync(localFilePath);
        return null;


    }
};

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });

export { uploadOnCloudinary };
