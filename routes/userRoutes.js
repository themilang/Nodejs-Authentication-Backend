import  express from "express";
const router=express.Router();
import { Login, Register, changePassword, loggedUser} from "../controllers/userController.js";
import { checkAutorization } from "../middlewares/auth-middleware.js";
import { ContactForm } from "../controllers/contactController.js";
import { whiteListEmail } from "../controllers/whitelistController.js";

router.post('/register',Register);
router.post('/login',Login)
router.post('/contact',ContactForm);
router.post('/subscription',whiteListEmail);



//route middleware
router.use('/changepassword',checkAutorization)
router.use('/loggeduser',checkAutorization)

//protected routes
router.post("/changepassword",changePassword)
router.get('/loggeduser',loggedUser)




export default  router;