import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const NewUserHomePage=({userData,setNewUserUpdated})=>{
    const [inputs,setInputs] = useState({})
    const navigate = useNavigate()
    const updateInputs=(e)=>{
        setInputs(prevState=>({...prevState,[e.target.name]:e.target.value}))
    }   
    const sendInformation=async(e)=>{
        e.preventDefault()
        console.log('im here')
        let token = window.localStorage.getItem('token')
        const resp = await axios.post("http://localhost:3001/api/userdata/newprofile",inputs,{headers:{
            'authorization':token,
            'content-type':'application/json'
        }})
        console.log(resp)
        setNewUserUpdated(true)
        navigate('../')
    }
    useEffect(()=>{
        if(userData.newAccount==='Existing'){
            navigate('../')
        }
    },[])
    return(
        <div>
            <form onSubmit={sendInformation}>
                <div>
                    <p>New User</p>
                </div>
                <div>
                    <p>Enter Name: </p>
                    <input name="Name" value={inputs.Name||''} onChange={updateInputs} required/>
                </div>
                <div>
                    <p>Enter Username: </p>
                    <input name="Username" value={inputs.Username||''} onChange={updateInputs} required/>
                    
                </div>
                <div>
                    <p>Enter RollNo: </p>
                    <input name="RollNo" value={inputs.RollNo||''} onChange={updateInputs} required/>
                    
                </div>
                <div>
                    <p>Enter Bio: </p>
                    <input name="Bio" value={inputs.Bio||''} onChange={updateInputs} required/>
                    
                </div>
                <div>
                    <p>Enter Phone Number: </p>
                    <input name="Phone" value={inputs.Phone||''} onChange={updateInputs} required/>
                    
                </div>
                <div>
                    <p>Enter Department: </p>
                    <input name="Department" value={inputs.Department||''} onChange={updateInputs} required/>
                    
                </div>
                <div>
                    <p>Enter Hostel: </p>
                    <input name="HostelName" value={inputs.HostelName||''} onChange={updateInputs} required/>
                </div>
                <div>
                    <p>Enter Image: </p>
                </div>
                <div>
                    <button type="submit">Submit information</button>
                </div>
            </form>
        </div>
    )
}
export default NewUserHomePage