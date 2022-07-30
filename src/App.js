import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupPage from "./HomePage/signup";
import LoginPage from "./HomePage/login";
import ErrorPage from "./ErrorPages/ErrorPage";
import UnauthorisedAccess from "./ErrorPages/UnauthorisedAccess";
import MainUserPage from "./UserPage/MainUserPage";
import { useEffect } from "react";
const SignUpDisplay=()=>{
  return(
    <div>
      <SignupPage/>
    </div>
  )
}

function App() {
  useEffect(()=>{
    window.onbeforeunload=()=>{
      window.localStorage.clear()
    }
  },[])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUpDisplay/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/user/*" element={<MainUserPage/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
          <Route path="/unauthorisedAccess" element={<UnauthorisedAccess/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
