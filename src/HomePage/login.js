import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import HomePageImage from "../Images/HomePageImage.jpeg"
const LoginPage=()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const sendResponse=async (e)=>{
        e.preventDefault()
        const body={
            email:email,
            password:password
        }
        const resp= await axios.post("http://localhost:3001/api/login",body)
        let token = resp.data.token
        window.localStorage.setItem('token','bearer '+token)
        navigate('../user')
    } 
    return(
        <div className="MainCredentials">
            <div className="HomePageFirstHalf">
                <div className="HomeCard">
                    <div className="MainTitle" id="Header" >
                        <h2>Digi Slam book</h2>
                        <div>
                            <p>Login</p>
                        </div>
                    </div>
                    
                    <div className="inputItems">
                        <div className="InputField">
                            <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                        </div>
                        <div className="InputField">
                            <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="SubmitOrChangeField">
                        <button className="SubmitButton" onClick={sendResponse}>Login</button>
                        <p>Don't have an account?<Link to="/"><span>Sign up</span></Link></p>    
                    </div>    
                </div>
            </div>
        </div>
    )
}
export default LoginPage