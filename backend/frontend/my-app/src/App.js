
import './App.css';
import {BrowserRouter , Route,Routes} from "react-router-dom";
import AppState from './context/appState';
import Login from './Component/Login';
import BookRoom from "./Component/Student_bookroom";

import DeleteStudent from "./Component/Admin_deletestudent";
import AddStudent from "./Component/Admin_addstudent";
import AdminViewRoom from "./Component/Admin_viewroom";
import AdminViewStudent from "./Component/Admin_viewstudent";
import StaffViewComplain from "./Component/Staff_viewcomplain";
import StaffviewRoom from "./Component/Staff_viewroom";
import Staffviewstudent from "./Component/Staff_viewstudent";
import AddComplain from "./Component/Student_addcomplain";
import StudentProfile from "./Component/Student_viewprofile";
import Adminhomepage from "./Component/Admin_homepage";
import Staffhomepage from "./Component/Staff_homepage";
import Studenthomepage from "./Component/Student_homepage";
import Student_viewcomplain from './Component/Student_viewcomplain';
import Student_sidebar from './Component/Student_sidebar';
import Changepassword from './Component/Changepassword';

function App() {
  return (
    <>
    <AppState>
      <div>
    <BrowserRouter>
       
       
       <Routes>
       <Route exact path='/changepass' element={<Changepassword/>}/>    
          < Route  path="/" element={<Login/>}/> 
        < Route exact path="/login" element={<Login/>}/> 
        < Route  exact path="/bookroom" element={<BookRoom/>}/> 
        < Route exact path="/student" element={<Student_sidebar/>}/> 
        < Route exact path="/deletestudent" element={<DeleteStudent/>}/> 
        < Route exact path="/adminhomepage" element={<Adminhomepage/>}/> 
        < Route exact path="/staffhomepage" element={<Staffhomepage/>}/> 
        < Route exact path="/studenthomepage" element={<Studenthomepage/>}/> 
        < Route exact path="/studentviewcomplain" element={<Student_viewcomplain/>}/> 
        < Route exact path="/addstudent" element={<AddStudent/>}/> 
        < Route exact path="/adminviewroom" element={<AdminViewRoom/>}/> 
        < Route exact path="/adminviewstudent" element={<AdminViewStudent/>}/> 
        < Route exact path="/staffviewcomplain" element={<StaffViewComplain/>}/> 
        < Route exact path="/staffviewroom" element={<StaffviewRoom/>}/> 
        < Route exact path="/staffviewstudent" element={<Staffviewstudent/>}/> 
        < Route exact path="/addcomplain" element={<AddComplain/>}/> 
        < Route exact path="/studentprofile" element={<StudentProfile/>}/> 

     

        </Routes>
        
        </BrowserRouter>
        </div>
    </AppState>
      
    </>
  );
}

export default App;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMjVlZDBiYTItODA1MC00NDM2LTliYjMtYjkzZWY5OGIzNDc4In0.QljcaGAFZhY4hb_Ize8NWqeBUmR10tQviBP5T946a2w