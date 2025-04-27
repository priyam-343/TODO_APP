const express=require(`express`);
const router=express.Router();
const passport=require(`passport`);

const userController=require(`../controllers/users_controller`);
const todoController=require(`../controllers/todo_controller`);

router.get(`/signin`,userController.signin);
router.get(`/signup`,userController.signup);
router.post(`/create_user`,userController.create_user);
router.post(`/create_session`,passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),userController.create_session);                 // failure will operate if credentials not match


module.exports=router;
router.get(`/todohome`,passport.checkAuthentication,todoController.home);
router.get(`/signout`,userController.delete_session);
router.post(`/addtask`,todoController.add_task);
router.get(`/delete_task`,todoController.delete_task);
router.post(`/toggle_check`,todoController.toggle_check)