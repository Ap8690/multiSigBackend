import { Router } from "express"
import transactionRouter from "./transaction.route"


const router = Router()

router.use("/transaction", transactionRouter)

export default router
