const { sequelize } = require("../db/models/index.js");

async function getUsers() {
  try {
    const [result , metadata] = await sequelize.query("SELECT * FROM users")
    return result;
  } catch (err) {
    err.message = "problam from read data"
    throw err;
  }
}

 async function login(email, password){
    const users = await getUsers();
    const user = users.find((user)=> user.email.toLowerCase() === email.toLowerCase()  && user.password === password);
    const{password:_ ,...userNoPass} = user
    return userNoPass;
 }
   

module.exports = {getUsers,login}