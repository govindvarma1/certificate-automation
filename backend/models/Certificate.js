import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

const CertificateModel = mongoose.model("Certificate", certificateSchema);

export default CertificateModel;
