import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {MongoClient} from "mongodb"
import { ingredientsRouter } from "./ingredients.js"
import { userAuthRouter } from "./userauth.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())

const MONGO_URL = process.env.MONGO_URL

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("mongodb connected")
    return client
}

export const client = await createConnection()

app.get("/", (request, response)=>{
    response.send("hai from recipe node")
})

app.use("/recipe/user", userAuthRouter)
app.use("/recipe/ingredients", ingredientsRouter)

app.listen(PORT, ()=>{
    console.log("app started at", PORT)
})