import express, { response } from "express"
import { auth } from "./customauth.js"
import { addIngredientType, addIngredientsForType, createRecipeCategory, getRecipeCategory, getAllIngredients, createNewRecipe, getAllRecipies, getLimitedRecipies, getUserCreatedRecipies, getUserCreatedLimitedRecipies, getAllRecipiesForCategory, getLimitedRecipeCategory, getBiryaniCatRecipies, getLimitedBiryaniCatRecipies, getCakeCatRecipies, getLimitedCakeCatRecipies, getHealthyCatRecipies, getLimitedHealthyCatRecipies, getRecipiesUnder30M , getLimitedRecipiesUnder30M, getRecipiesUnder10M, getLimitedRecipiesUnder10M, getRecipeDetailsById} from "./helper.js"
const router = express.Router()

router.route("/addIngredientType")
.post(async (request, response)=>{
    const result = await addIngredientType(request.body)
    response.send(result)
})

router.route("/addIngredientsForType")
.post(async (request, response)=>{
    const result = await addIngredientsForType(request.body)
    response.send(result)
})

router.route("/getAllIngredients")
.get(async (request, response)=>{
    const result = await getAllIngredients()
    response.send(result)
})

router.route("/createRecipeCategory")
.post(async (request, response)=>{
    const result = await createRecipeCategory(request.body)
    response.send(result)
})

router.route("/getRecipeCategory")
.get(async (request, response)=>{
    const result = await getRecipeCategory()
    response.send(result)
})

router.route("/getLimitedRecipeCategory")
.get(async (request, response)=>{
    const result = await getLimitedRecipeCategory()
    response.send(result)
})

router.route("/createNewRecipe")
.post(auth ,async (request, response)=>{
    const result = await createNewRecipe({...request.body, servings: parseInt(request.body.servings), totalTime: parseInt(request.body.totalTime) ,reviews:[], postedAt: new Date().toISOString()})
    response.send(result)
})

router.route("/getAllRecipies")
.get(async (request, response)=>{
    const result = await getAllRecipies()
    response.send(result)
})

router.route("/getLimitedRecipies")
.get(async (request, response)=>{
    const result = await getLimitedRecipies()
    response.send(result)
})

router.route("/getUserCreatedRecipies")
.get(auth, async(request, response)=>{
    const userId = request.user.id
    const result = await getUserCreatedRecipies(userId)
    response.send(result)
})

router.route("/getUserCreatedLimitedRecipies")
.get(auth, async(request, response)=>{
    const userId = request.user.id
    const result = await getUserCreatedLimitedRecipies(userId)
    response.send(result)
})

router.route("/getAllRecipiesForCategory/:recipeCat")
.get(async(request, response)=>{
    const {recipeCat} = request.params
    const result = await getAllRecipiesForCategory(recipeCat)
    response.send(result)
})

router.route("/getBiryaniCatRecipies")
.get(async(request, response)=>{
    const result = await getBiryaniCatRecipies()
    response.send(result)
})

router.route("/getLimitedBiryaniCatRecipies")
.get(async(request, response)=>{
    const result = await getLimitedBiryaniCatRecipies()
    response.send(result)
})

router.route("/getCakeCatRecipies")
.get(async(request, response)=>{
    const result = await getCakeCatRecipies()
    response.send(result)
})

router.route("/getLimitedCakeCatRecipies")
.get(async(request, response)=>{
    const result = await getLimitedCakeCatRecipies()
    response.send(result)
})

router.route("/getHealthyCatRecipies")
.get(async(request, response)=>{
    const result = await getHealthyCatRecipies()
    response.send(result)
})

router.route("/getLimitedHealthyCatRecipies")
.get(async(request, response)=>{
    const result = await getLimitedHealthyCatRecipies()
    response.send(result)
})

router.route("/getRecipiesUnder30M")
.get(async (request, response)=>{
    const result = await getRecipiesUnder30M()
    response.send(result)
})

router.route("/getLimitedRecipiesUnder30M")
.get(async (request, response)=>{
    const result = await getLimitedRecipiesUnder30M()
    response.send(result)
})

router.route("/getRecipiesUnder10M")
.get(async (request, response)=>{
    const result = await getRecipiesUnder10M()
    response.send(result)
})

router.route("/getLimitedRecipiesUnder10M")
.get(async (request, response)=>{
    const result = await getLimitedRecipiesUnder10M()
    response.send(result)
})

router.route("/getRecipeDetailsById/:id")
.get(async (request, response)=>{
    const {id} = request.params
    const result = await getRecipeDetailsById(id)
    response.send(result)
})

export const ingredientsRouter = router