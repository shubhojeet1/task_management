import { Route, Routes } from "react-router-dom";
import NavbarBeforeLogin from "../Components/NavbarBeforeLogin";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import CreateTask from "../Components/CreateTask";
import NavbarAfterLogin from "../Components/NavbarAfterLogin";
import Tasks from "../Components/Tasks";



export default function AllRoutes(){


    return (
        <Routes>
            <Route path="/" element={<NavbarBeforeLogin><Signup/></NavbarBeforeLogin>}></Route>
            <Route path="/login" element={<NavbarBeforeLogin><Login/></NavbarBeforeLogin>} ></Route>
            <Route path="/create" element={<NavbarAfterLogin><CreateTask/></NavbarAfterLogin>}  ></Route>
            <Route path="/task" element={<NavbarAfterLogin><Tasks   /></NavbarAfterLogin>} ></Route>
        </Routes>
    )
}