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
                        <p>Digi Slam book</p>
                    </div>
                    <div>
                        <div className="InputField">
                            <p>Email:</p>
                            <input onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="InputField">
                            <p>Password</p>
                            <input onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <button className="SubmitButton" onClick={sendResponse}>Login</button>
                        <Link to="/" className="AltLogin">Don't have an account? sign up</Link>    
                    </div>    
                </div>
            </div>
            <div className="HomePageSecondHalf">
                <img className="homePageImageStyle" src={HomePageImage}/>
            </div>
        </div>
    )
}
export default LoginPage