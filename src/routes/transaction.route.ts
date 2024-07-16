import { Router } from "express";
import { addTx, executeTransaction, getTrasactions, signTransaction } from "../controllers/transaction.controller";

const transactionRouter = Router()

transactionRouter.post('/saveTransaction', addTx)
transactionRouter.post('/getTransaction', getTrasactions)
transactionRouter.post('/signTransaction', signTransaction)
transactionRouter.post('/executeTransaction', executeTransaction)

export default transactionRouter;