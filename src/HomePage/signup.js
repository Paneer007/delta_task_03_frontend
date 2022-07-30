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
            navigate('/error')
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
                    <p>Digi Slam book</p>
                    <p>Rejoice and remember the best years of your life</p>
                </div>
                <div>
                    <p>Email:</p>
                    <input onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button onClick={sendCredentials}>Sign up</button>
                <Link to="/login">Have an existing account? log in</Link>
            </div>
            
        </div>
    )
}
export default SignupPage