// import mongoose from "mongoose";
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//   },
//   email: {
//     type: String
//   },
//   password: {
//     type: String,
//   }
// }
// ,{
//     timestamps:true
// }
// );
// const Users=mongoose.models.tesla_user||mongoose.model('tesla_user',UserSchema);
// export default Users;
import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  
});
const User=models.teslas_user||model("teslas_user",UserSchema);
export default User
