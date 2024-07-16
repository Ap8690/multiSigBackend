import mongoose from "mongoose"

export const connectDB = async (mongoUri: string | undefined) => {
  if (!mongoUri) return
  await mongoose.connect(mongoUri)
  console.log("Database connection established")
}
