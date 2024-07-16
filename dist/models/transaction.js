"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    wallet: {
        type: String,
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Transaction", TransactionSchema);
