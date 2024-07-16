"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTransaction = exports.signTransaction = exports.getTrasactions = exports.addTx = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
const addTx = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { to, amount, wallet } = req.body;
        yield transaction_1.default.create({
            to,
            amount,
            wallet,
        });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.addTx = addTx;
const getTrasactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wallet } = req.body;
        const walletTransactions = yield transaction_1.default.find({ wallet });
        return res.status(200).json({ transactions: walletTransactions });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.getTrasactions = getTrasactions;
const signTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { signature, transactionId, signer } = req.body;
        const transaction = yield transaction_1.default.findOne({ _id: transactionId });
        if (!transaction)
            throw new Error("Transaction not found");
        yield transaction_1.default.updateOne({ _id: transactionId }, {
            signatures: [...transaction.signatures, {
                    signature: signature,
                    signer: signer
                }]
        });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.signTransaction = signTransaction;
const executeTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = req.body;
        yield transaction_1.default.updateOne({ _id: transactionId }, { executed: true });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.executeTransaction = executeTransaction;
