require("dotenv").config()
const app = require("./app");
const pool = require("./config/db");
const PORT = process.env.PORT || 3000





app.listen (PORT , async()=>{
    // console.log(`Server Running In ${PORT} ✅`);
    
      try {
    await pool.query("SELECT 1");
    console.log(`Server Running In ${PORT} ✅`);
    console.log("Database Connected ✅");
  } catch (error) {
    console.error("Database Connection Failed ❌");
    console.error(error.message);
  }

})