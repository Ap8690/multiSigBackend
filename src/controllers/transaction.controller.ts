import { Response } from "express";
import Transaction from "../models/transaction";

export const addTx = async (req: any, res: Response) => {
    console.log(req.body);
    try {
        const { to, amount, wallet } = req.body;
        await Transaction.create({
            to,
            amount,
            wallet,
        })
        return res.status(200).json({ success: true })
    } catch (error: any) {
        console.log({ error })
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const getTrasactions = async (req: any, res: Response) => {
    try {
        const { wallet } = req.body;
        const walletTransactions = await Transaction.find({ wallet });
        return res.status(200).json({ transactions: walletTransactions })
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const signTransaction = async (req: any, res: Response) => {
    try {
        const { signature, transactionId, signer } = req.body;
        const transaction = await Transaction.findOne({ _id: transactionId });
        if (!transaction) throw new Error("Transaction not found")
        await Transaction.updateOne({ _id: transactionId },{
            signatures: [...transaction.signatures, {
                signature: signature,
                signer: signer
            }]
        })
        return res.status(200).json({ success: true })
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const executeTransaction = async (req: any, res: Response) => {
    try {
        const { transactionId } = req.body;
        await Transaction.updateOne({ _id: transactionId }, { executed: true })
        return res.status(200).json({ success: true })
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message })
    }
}