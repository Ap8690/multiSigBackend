import { model, Schema } from "mongoose";

const TransactionSchema = new Schema({
    wallet: {
        type : String,
    },
    to: {
        type: String,
    },
    amount: {
        type: Number,
    },
    signatures: [{
        signature: String,
        signer: String,
    }],
    executed: {
        type: Boolean,
        default: false,
    }
},{timestamps: true})

export default model("Transaction", TransactionSchema)