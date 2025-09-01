const recipeModel = require('../model/recipeModel')
const { validateRecipe } = require('../recipeValidator');



async function getAllRecipes(req, res, next) {
  try {
    const recipes = await recipeModel.getRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
}



async function getRecipeByParam(req, res, next) {
  try {
    let recipes = await recipeModel.getRecipes();

    const { difficulty, maxCookingTime, search } = req.query;
    recipes = filterByDifficulty(recipes, difficulty);
    recipes = filterByMaxCookingTime(recipes, maxCookingTime);
    recipes = filterBySearch(recipes, search);
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
}

function filterByDifficulty(recipes, difficulty) {
  if (!difficulty) return recipes;
  return recipes.filter(r => r.difficulty === difficulty);
}

function filterByMaxCookingTime(recipes, maxCookingTime) {
  if (!maxCookingTime) return recipes;
  return recipes.filter(r => r.cookingTime <= parseInt(maxCookingTime));
}

function filterBySearch(recipes, search) {
  if (!search) return recipes;
  const searchLower = search.toLowerCase();
  return recipes.filter(
    r =>
      r.title.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower)
  );
}

async function getRecipeById(req, res, next) {
  try {
    const id = req.userId;
    const recipes = await recipeModel.getRecipes();
    const recipe = recipes.find(r => r.id == id);
    if (!recipe) {
      const error = new Error('Recipe not found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
}




async function addRecipeToRecipes(req, res, next) {
  try {
    const valid = validateRecipe(req.body);

    if (!valid) {
      return res.status(400).json({
        message: "Invalid recipe data",
        errors: validateRecipe.errors
      });
    }

    const savedRecipe = await recipeModel.addRecipe(req.body);
    res.status(201).json(savedRecipe);
  } catch (err) {
    next(err);
  }
}


async function updateRecipe(req, res, next) {
  try {
    const recipes = await recipeModel.getRecipes()
    const id = req.userId
    console.log(id)
    const updateRecipe = recipes.find(r => r.id == id)
    Object.assign(updateRecipe, req.body);

    const valid = validateRecipe(updateRecipe);
    if (!valid) {
      return res.status(400).json({
        message: "Invalid recipe data",
        errors: validateRecipe.errors
      });
    }

    const savedRecipe = await recipeModel.updateRecipe(id, updateRecipe);
    res.status(200).json(savedRecipe);

  } catch (err) {
    next(err)
  }
}

async function deleteRecipe(req, res, next) {
    try {
    const id = req.userId;
    const recipes = await recipeModel.getRecipes();
    const recipe = recipes.find(r => r.id == id);
    if (!recipe) {
      const error = new Error('Recipe not found');
      error.status = 404;
      return next(error);
    }

   const deleteRec = await recipeModel.deleteRecipeFromRecipe(id)
 res.status(200).json(deleteRec);
  } catch (err) {
    next(err);
  }
}


async function getStat(req, res, next) {
  try {
     const recipes = await recipeModel.getRecipes()

     const sum = recipes.reduce((acc , recipe) =>{
        return acc + recipe.cookingTime;
     },0)

       const easy = recipes.reduce((acc , recipe) =>{
        if(recipe.difficulty === "easy"){
         return acc+1;
        } 
        return acc 
     },0)
         const hard = recipes.reduce((acc , recipe) =>{
        if(recipe.difficulty === "hard"){
         return acc+1;
        } 
        return acc 
     },0)
         const medium = recipes.reduce((acc , recipe) =>{
        if(recipe.difficulty === "medium"){
         return acc+1;
        } 
        return acc 
     },0)

 
     const stat ={length:recipes.length , cookingTimeAv :sum , difficulty:{ easy , medium , hard} }
     res.status(200).json(stat)
  } catch (err) {
    next(err);
  }
  
}


module.exports = { getAllRecipes, getRecipeByParam, getRecipeById, addRecipeToRecipes, updateRecipe , deleteRecipe , getStat };