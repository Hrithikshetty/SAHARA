import { Router } from "express";
import { VolunteerUser, updateLocation, getallvolunteers } from "../Controllers/volunteer.js";

const volrouter = Router()

    volrouter.route("/volunteerer").post(VolunteerUser)

    volrouter.route("/updateLocation").post(updateLocation)

    volrouter.route('/getvolunteers').get(getallvolunteers) 
    
    export default volrouter