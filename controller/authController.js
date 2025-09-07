
const autoModel = require('../model/autoModel');

async function login ( req, res, next){
    try{
        const {email, password}= req.body;
        console.log(req.body)
        if(!email||!password){
            throw {status:400 , message:"email or pass miss"}
        }
        const user = await autoModel.login(email,password);
        if(!user){
            throw {status:401 , message:"invalide email or pass"}
        }
        res.status(200).send(user);
    }catch (err){
        next(err);
    }
}
module.exports= {login}