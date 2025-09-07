const fs = require('fs');
const path = './data/recipes.json';
const { sequelize } = require("../db/models/index.js");

async function getRecipes() {
  try {
    const [result , metadata] = await sequelize.query("SELECT * FROM recipes")
    return result;
  } catch (err) {
    err.message = "problam from read data"
    throw err;
  }
}

async function getRecipeById(id) {
  try {
    const recipes =await getRecipes();
    console.log(JSON.parse(recipes.filter(r => r.id == id)))
  
    return recipes.filter(r => r.id == id);
  } catch (err) {
    err.message = "problam from read data"
    throw err;
  }
}

async function updateRecipe(id, updateRecipe) {
  const recipes = await getRecipes();
  const recipe = recipes.find(r => r.id == id);
  if (!recipe) {
    throw new Error('Recipe not found');
  }
  Object.assign(recipe, updateRecipe);
  await fs.promises.writeFile(path, JSON.stringify(recipes, null, 2), 'utf-8');
  return recipe;
}

async function addRecipe(newRecipe) {
  try {
    const recipes = await getRecipes();
    newRecipe.id = (recipes.length + 1).toString();
    newRecipe.createdAt = new Date().toISOString();
    recipes.push(newRecipe);
    await fs.promises.writeFile(path, JSON.stringify(recipes, null, 2), 'utf-8');
    return newRecipe;
  } catch (err) {
    err.message = "Problem writing data";
    throw err;
  }
}


async function deleteRecipeFromRecipe(id) {
try{
  const recipes = await getRecipes();
  const recipe = recipes.find(r => r.id == id);
  if (!recipe) {
    throw new Error('Recipe not found');
  }
  const updateRecipes = recipes.filter(r => r.id != id);
  console.log(updateRecipes)
  await fs.promises.writeFile(path, JSON.stringify(updateRecipes, null, 2), 'utf-8');
  return recipe;
  } catch (err) {
    err.message = "Problem writing data";
    throw err;
  }
}


module.exports = { getRecipes, addRecipe, getRecipeById, updateRecipe ,deleteRecipeFromRecipe  };