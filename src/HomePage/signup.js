import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
const SignupPage=()=>{
    const [email,setEmail]= useState()
    const [password,setPassword]=useState()
    const [loadingFlag,setLoadingFlag]=useState(false)
    const navigate = useNavigate()
    const sendCredentials =async(e)=>{
        e.preventDefault()
        const body ={
            email:email,
            password:password
        }
        setLoadingFlag(true)
        try{
            const resp = await axios.post("http://localhost:3001/api/signup",body)  
            console.log(resp) 
            setLoadingFlag(false)
            navigate('/login')           
        }catch(error){
            alert("Enter a valid username and password")
        }
 
    }
    if(loadingFlag){
        return(
            <div>
                <p>Processing request</p>
                <p>Loading...</p>
            </div>
        )
    }
    return(
        <div className="MainCredentials">
            <div className="HomeCard">
                <div className="MainTitle" id="Header">
                    <h2>Digi Slam book</h2>
                    <div>
                        <p>Sign up</p>
                    </div>
                </div>
                <div className="inputItems">
                    <div className="InputField">
                        <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                    </div>
                    <div className="InputField">
                        <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    </div>
                </div>
                <div className="SubmitOrChangeField">
                    <button onClick={sendCredentials}>Sign up</button>
                    <p>Have an existing account?<span><Link to="/login">log in</Link></span></p>
                </div>
            </div>
            
        </div>
    )
}
export default SignupPage