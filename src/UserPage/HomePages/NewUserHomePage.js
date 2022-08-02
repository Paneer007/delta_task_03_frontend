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
        const resp = await axios.post("/api/userdata/newprofile",inputs,{headers:{
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
        <div className="UserHomePageContent">
            <div>
                <h2>New User</h2>
            </div>
            <form onSubmit={sendInformation} className="dropDownStyling">
                <div className="TakeUserInformation">
                    <p>Enter Name: </p>
                    <input name="Name" value={inputs.Name||''} onChange={updateInputs} required/>
                </div>
                <div className="TakeUserInformation">
                    <p>Enter Username: </p>
                    <input name="Username" value={inputs.Username||''} onChange={updateInputs} required/>
                    
                </div>
                <div className="TakeUserInformation">
                    <p>Enter RollNo: </p>
                    <input name="RollNo" value={inputs.RollNo||''} onChange={updateInputs} required/>
                    
                </div>
                <div className="TakeUserInformation">
                    <p>Enter Bio: </p>
                    <input name="Bio" value={inputs.Bio||''} onChange={updateInputs} required/>
                    
                </div>
                <div className="TakeUserInformation">
                    <p>Enter Phone Number: </p>
                    <input name="Phone" value={inputs.Phone||''} onChange={updateInputs} required/>
                </div>
                <div className="TakeUserInformation">
                    <p>Enter Department: </p>
                    <input name="Department" value={inputs.Department||''} onChange={updateInputs} required/>
                </div>
                <div className="TakeUserInformation">
                    <p>Enter Hostel: </p>
                    <input name="HostelName" value={inputs.HostelName||''} onChange={updateInputs} required/>
                </div>
                <div>
                    <button type="submit" className="submitButton gapForEdit">Submit information</button>
                </div>
            </form>
        </div>
    )
}
export default NewUserHomePage