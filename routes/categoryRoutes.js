import express from 'express'
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController,deleteCaregoryController,singleCategoryController,updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

//routes
//create 
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get-all category
router.get('/get-category',categoryController)

//single category
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCaregoryController)
export default router