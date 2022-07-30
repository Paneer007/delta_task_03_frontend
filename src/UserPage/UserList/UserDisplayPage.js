import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import validateUserToken from "../../utils/tokenHelper"
const UserDisplayPage = ()=>{
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
            <div>
                <p>
                    {userData.Name}
                </p>
                <p>
                    {userData.Username}

                </p>
                <p>
                {userData.Phone}

                </p>
                <p>
                {userData.Bio}

                </p>
                <p>
                    {userData.Department}
                </p>
            </div>
            <div>
                Leave a comment
            </div>
            <div>
                <button onClick={()=>commentPopUp()}>Leave a comment on the user</button>
            </div>
            <div className="popup invisibleClass" id="addComment">
                <p onClick={()=>commentPopUp()}>X</p>
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
                    <button type="submit">Submit</button>
                </form> 
            </div>
        </div>
    )
}
export default UserDisplayPage