import mongoose from 'mongoose';

const supplyRequestSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending', // Status of the request
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SupplyRequest = mongoose.model('SupplyRequest', supplyRequestSchema);

export default SupplyRequest;
