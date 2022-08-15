import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import validateUserToken from "../../utils/tokenHelper"
const UserDisplayPage = ({setNewUserUpdated})=>{
    const updateInputs =(e)=>{
        setUserComment(prevState=>({...prevState,[e.target.name]:e.target.value}))
    }
    const commentPopUp = async()=>{
        const toggleButton = document.getElementById('addComment')
        toggleButton.classList.toggle('invisibleClass')
    }
    const [buffer,setBuffer]= useState(true)
    const [userData,setUserData] = useState('')
    const [userComment,setUserComment] = useState({Describe:'',Quality:'',Day:'', Thing:''})
    let {userId}=useParams();
    useEffect(()=>{
        const getUserData = async()=>{
            const token = window.localStorage.getItem('token')
            const resp = await axios.get(`http://localhost:3001/api/userdata/${userId}`,{headers:{'authorization':token,'content-type':'application/json'}})
            console.log(resp.data)
            setBuffer(false)
            setUserData(resp.data)
        }
        validateUserToken()
        getUserData()
    },[])
    const sendUserData = async(e)=>{
        e.preventDefault()
        const token = window.localStorage.getItem('token')
        const body ={userId:userId, userComment:userComment}
        setBuffer(true)
        const resp = await axios.post("http://localhost:3001/api/userdata/postcomment",body,{headers:{'authorization':token,'content-type':'application/json'}})
        setBuffer(false)
        setNewUserUpdated(true)
        commentPopUp()
    }
    if(buffer){
        return(
            <div>
                Please wait...
            </div>
        )
    }
    return(
        <div>
            <div className="UserHomePageContent">
                <h2>About User</h2>
                <div className="dropDownStyling">
                    <p><span className="subtableContent">Name:</span> {userData.Name}</p>
                    <p><span className="subtableContent">Username:</span> {userData.Username}</p>
                    <p><span className="subtableContent">Phone number:</span> {userData.Phone}</p>
                    <p><span className="subtableContent">Bio:</span> {userData.Bio}</p>
                    <p><span className="subtableContent">Department:</span> {userData.Department}</p>
                </div>
            </div>
            <div>
                <div>
                    <button onClick={()=>commentPopUp()} className="LeaveACommentButton">Leave a comment on the user</button>
                </div>
            </div>
            
            <div className="popup invisibleClass" id="addComment">
                <form onSubmit={sendUserData}>
                    <div className="inputBox">
                        <p>Describe me in one word</p>
                        <input name="Describe" value={userComment.Describe||''} onChange={updateInputs} required/>
                    </div>
                    <div className="inputBox">
                        <p>Favorite quality</p>
                        <input name="Quality" value={userComment.Quality||''} onChange={updateInputs} required/>                       
                    </div>
                    <div className="inputBox">
                        <p>Most memorable day</p>
                        <input name="Day" value={userComment.Day||''} onChange={updateInputs} required/>
                    </div>
                    <div className="inputBox">
                        <p>If you could steal one thing from me, what would it be</p>
                        <input name="Thing" value={userComment.Thing||''} onChange={updateInputs} required/>
                    </div>
                    <div className="finalButton">
                        <button type="submit" className="submitButton">Submit</button>
                        <button onClick={()=>commentPopUp()} className="cancelButton">Cancel</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}
export default UserDisplayPage