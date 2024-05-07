import mongoose from "mongoose";

const certificateShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true
        },
        date : {
            type: Date,
            required: true
        },
        link : {
            type: String,
            required: true, 
        }
    }
)

const Certificate = mongoose.model("certificate", certificateShema)
export default Certificate