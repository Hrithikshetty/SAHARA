import { Router } from "express";
import { userpost, likePost, getuserpost } from "../Controllers/Post.js";
import {upload} from  "../middlewares/multer.js"

const postrouter = Router();

postrouter.route("/postnews").post(upload.fields([{ name: "imageUrl", maxCount: 1 }]), userpost);
postrouter.post('/like/:postId', likePost);
postrouter.route('/getposts').get(getuserpost) 

export default postrouter;
