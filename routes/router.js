const express = require('express');
const router = express.Router();
const {getAllRecipes , getRecipeByParam ,getRecipeById ,addRecipeToRecipes ,updateRecipe ,deleteRecipe ,getStat ,getAllUsers} = require('../controller/recipeController');
const { validateId } = require('../middelwares/validation');


router.get('/',getRecipeByParam)

router.get('/', getAllRecipes);

router.get('/users', getAllUsers);


router.get('/stat' , getStat)

router.get('/:id', validateId, getRecipeById);

router.post('/', addRecipeToRecipes);
 
router.put('/:id' ,validateId , updateRecipe)

router.delete('/:id' ,validateId , deleteRecipe)



module.exports = router;