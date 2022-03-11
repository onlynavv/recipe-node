import { ObjectId } from "mongodb"
import {client} from "./index.js"
import bcrypt from "bcrypt"

async function addIngredientType(data){
    return await client.db("recipe").collection("ingredientType").insertOne(data)
}

async function addIngredientsForType(data){
    return await client.db("recipe").collection("ingredients").insertOne(data)
}

async function getAllIngredients(){
    return await client.db("recipe").collection("ingredients").find({}).toArray()
}

async function createRecipeCategory(data){
    return await client.db("recipe").collection("recipeCategory").insertOne(data)
}

async function getRecipeCategory(){
    return await client.db("recipe").collection("recipeCategory").find({}).toArray()
}

async function getLimitedRecipeCategory(){
    return await client.db("recipe").collection("recipeCategory").find({}).limit(6).toArray()
}

async function createNewRecipe(data){
    return await client.db("recipe").collection("recipies").insertOne(data)
}

async function updateRecipeDetail(data, id){
    return await client.db("recipe").collection("recipies").updateOne({"_id":ObjectId(id)}, {$set:{"recipeName":data.recipeName, "servings": data.servings, "totalTime":data.totalTime, "recipeCat":data.recipeCat, "recipeDescription":data.recipeDescription, "ingredientsList": data.ingredientsList, "instructionList": data.instructionList, "recipePic": data.recipePic}}, {upsert:true})
}

async function getAllRecipies(){
    return await client.db("recipe").collection("recipies").find({}).sort({postedAt: -1}).toArray()
}

async function getLimitedRecipies(){
    return await client.db("recipe").collection("recipies").find({}).sort({postedAt: -1}).limit(4).toArray()
}

async function getUserCreatedRecipies(userId){
    return await client.db("recipe").collection("recipies").find({authorId: userId}).sort({postedAt: -1}).toArray()
}

async function getUserCreatedLimitedRecipies(userId){
    return await client.db("recipe").collection("recipies").find({authorId: userId}).sort({postedAt: -1}).limit(4).toArray()
}

async function getAllRecipiesForCategory(recipeCat){
    return await client.db("recipe").collection("recipies").find({recipeCat:recipeCat}).sort({postedAt: -1}).toArray()
}

async function getBiryaniCatRecipies(){
    return await client.db("recipe").collection("recipies").find({recipeCat: "Briyani Paradise"}).sort({postedAt: -1}).toArray()
}

async function getLimitedBiryaniCatRecipies(){
    return await client.db("recipe").collection("recipies").find({recipeCat: "Briyani Paradise"}).sort({postedAt: -1}).limit(4).toArray()
}

async function getCakeCatRecipies(){
    return await client.db("recipe").collection("recipies").find({recipeCat: "Cakes"}).sort({postedAt: -1}).toArray()
}

async function getLimitedCakeCatRecipies(){
    return await client.db("recipe").collection("recipies").find({recipeCat: "Cakes"}).sort({postedAt: -1}).limit(4).toArray()
}

async function getHealthyCatRecipies(){
    return await client.db("recipe").collection("recipies").find({recipeCat: "Healthy"}).sort({postedAt: -1}).toArray()
}

async function getLimitedHealthyCatRecipies(){
    return await client.db("recipe").collection("recipies").find({recipeCat: "Healthy"}).sort({postedAt: -1}).limit(4).toArray()
}

async function getRecipiesUnder30M(){
    return await client.db("recipe").collection("recipies").find({totalTime:{$gt:10, $lte:30}}).sort({postedAt: -1}).toArray()
}

async function getLimitedRecipiesUnder30M(){
    return await client.db("recipe").collection("recipies").find({totalTime:{$gt:10, $lte:30}}).sort({postedAt: -1}).limit(4).toArray()
}

async function getRecipiesUnder10M(){
    return await client.db("recipe").collection("recipies").find({totalTime:{$lte:10}}).sort({postedAt: -1}).toArray()
}

async function getLimitedRecipiesUnder10M(){
    return await client.db("recipe").collection("recipies").find({totalTime:{$lte:10}}).sort({postedAt: -1}).limit(4).toArray()
}

async function getRecipeDetailsById(id){
    return await client.db("recipe").collection("recipies").findOne({_id:ObjectId(id)})
}

async function getSingleUserRecipies(id){
    return await client.db("recipe").collection("recipies").find({authorId:id}).sort({postedAt: -1}).toArray()
}

async function submitReviews(id, data){
    return await client.db("recipe").collection("recipies").updateOne({_id:ObjectId(id)},{$push:{"reviews":data}}, {upsert:true})
}

async function addToFavourites(userId, data){
    return await client.db("recipe").collection("users").updateOne({_id:ObjectId(userId)}, {$push:{"favourites":data}}, {upsert:true})
}

async function removeFavourites(userId, id){
    return await client.db("recipe").collection("users").updateOne({_id:ObjectId(userId)}, {$pull:{"favourites":{_id:ObjectId(id)}}})
}

async function getFavoritesRecipies(userId){
    return await client.db("recipe").collection("users").findOne({_id:ObjectId(userId)}, {projection:{"favourites":1}})
}

async function getUserByEmail(email){
    return await client.db("recipe").collection("users").findOne({email:email})
}

async function genPassword(password){
    const NO_OF_ROUNDS = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    
    const hashedPassword = await bcrypt.hash(password, salt)
    
    return hashedPassword
}

async function createUser(data) {
    return await client.db("recipe").collection("users").insertOne(data);
}

export {addIngredientType, addIngredientsForType, createRecipeCategory, getRecipeCategory, getUserByEmail, genPassword, createUser, getAllIngredients, createNewRecipe, getAllRecipies, getLimitedRecipies, getUserCreatedRecipies, getUserCreatedLimitedRecipies, getAllRecipiesForCategory, getLimitedRecipeCategory, getBiryaniCatRecipies, getLimitedBiryaniCatRecipies, getCakeCatRecipies, getLimitedCakeCatRecipies, getHealthyCatRecipies, getLimitedHealthyCatRecipies, getRecipiesUnder30M, getLimitedRecipiesUnder30M, getRecipiesUnder10M, getLimitedRecipiesUnder10M, getRecipeDetailsById, getSingleUserRecipies, submitReviews, updateRecipeDetail, addToFavourites, removeFavourites, getFavoritesRecipies }