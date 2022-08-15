import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const greetingLogic =()=>{
    let date = new Date()
    let hour = date.getHours()
    if(hour<12){
        return "Good Morning"
    }else if(hour===12){
        return "Good Noon"
    }else if (hour <18){
        return "Good Afternoon"
    }else{
        return "Good Evening"
    }
}
const CommentByData =({commentDetails,setNewUserUpdated})=>{
    const [who,setWho] = useState('')
    const [buffer,setBuffer]= useState(true)
    useEffect(()=>{
        const getSenderData = async()=>{
            try{
                const token = window.localStorage.getItem('token')
                const resp = await axios.get(`http://localhost:3001/api/userdata/${commentDetails.To}`,{headers:{'authorization':token,'content-type':'application/json'}})
                setWho(resp.data)
                setBuffer(false)
            }catch(e){
                console.log(e)
            }
        }
        getSenderData()
    },[])
    const deleteComment =async()=>{
        setBuffer(true)
        const token = window.localStorage.getItem('token')
        const resp = await axios.delete('http://localhost:3001/api/userdata/comment',{headers:{'authorization':token,'content-type':'application/json'},data:{data:commentDetails}})
        setNewUserUpdated(true)
        setBuffer(false)
    }
    if(buffer){
        return(
            <div>
                Please Wait...
            </div>
        )
    }
    return(
        <div className="dropDownStyling">
            <p><span className="subtableContent">To:</span> {who.Name}</p>
            <div>
                <p><span className="subtableContent">Favorite Day:</span> {commentDetails.Day}</p>
            </div>
            <div>
                <p><span className="subtableContent">One word to describe me:</span> {commentDetails.Describe}</p>
            </div>
            <div>
                <p><span className="subtableContent">Favorite Quality about me:</span> {commentDetails.Quality}</p>
            </div>
            <div>
                <p><span className="subtableContent">One thing you want from me:</span> {commentDetails.Thing}</p>
            </div>
            <div className="ProfileAndDeleteStuff">
                <Link to={`./userlist/${who._id}`} className="editProfileButton">Link To profile</Link>
                <button className="deleteButton" onClick={deleteComment}>Delete comment</button>
            </div>
            
        </div>
    )
}
const CommentToData=({commentDetails,setNewUserUpdated})=>{
    //fix this bit
    console.log(commentDetails)
    const [who,setWho] = useState('')
    const [buffer,setBuffer]= useState(true)
    useEffect(()=>{
        const getSenderData = async()=>{
            try{
                const token = window.localStorage.getItem('token')
                const resp = await axios.get(`http://localhost:3001/api/userdata/${commentDetails.From}`,{headers:{'authorization':token,'content-type':'application/json'}})
                console.log(resp)
                setWho(resp.data)
                setBuffer(false)
            }catch(e){
                console.log(e)
            }
            
        }
        getSenderData()
    },[])
    const deleteComment =async()=>{
        setBuffer(true)
        const token = window.localStorage.getItem('token')
        const resp = await axios.delete('http://localhost:3001/api/userdata/comment',{headers:{'authorization':token,'content-type':'application/json'},data:{data:commentDetails}})
        setNewUserUpdated(true)
        setBuffer(false)
    }
    if(buffer){
        return(
            <div>
                Please Wait...
            </div>
        )
    }
    return(
        <div className="dropDownStyling">
            <p><span className="subtableContent">From:</span> {who.Name}</p>
            <div>
                <p><span className="subtableContent">Favorite Day:</span> {commentDetails.Day}</p>
            </div>
            <div>
                <p><span className="subtableContent">One word to describe me:</span> {commentDetails.Describe}</p>
            </div>
            <div>
                <p><span className="subtableContent">Favorite Quality about me:</span> {commentDetails.Quality}</p>
            </div>
            <div>
                <p><span className="subtableContent">One thing you want from me:</span> {commentDetails.Thing}</p>
            </div>
            <div className="ProfileAndDeleteStuff">
                <Link to={`./userlist/${who._id}`} className="editProfileButton">Link To profile</Link>
                <button className="deleteButton" onClick={deleteComment}>Delete comment</button>
            </div>
        </div>
    )
}
const DefaultHomePage=({userData,setNewUserUpdated})=>{
    console.log(userData)
    const greeting = greetingLogic()+' '+userData.Name
    const dropDownMenu=(id,swapTitle)=>{
        document.getElementById(id).classList.toggle("hiddenDropDown")
        document.getElementById(swapTitle).textContent=document.getElementById(swapTitle).textContent==="expand_more"?"expand_less":"expand_more"
    }
    return(
        <div className="UserHomePageContent">
            <h2 className="Title">{greeting}</h2>
            <div>
                <div>
                    <h3 onClick={(e)=>{dropDownMenu("HomePageUserBioData","SpanTitleAboutMe")}} className="TitleDescriptionHomePage">About yourself <span class="material-symbols-outlined" id="SpanTitleAboutMe">expand_less</span></h3>
                    <div id="HomePageUserBioData" className="dropDownStyling">
                        <p><span className="subtableContent">Username:</span> {userData.Username}</p>
                        <p><span className="subtableContent">Roll No:</span> {userData.RollNo}</p>
                        <p><span className="subtableContent">Bio:</span> {userData.Bio}</p>
                        <p><span className="subtableContent">Phone:</span> {userData.Phone}</p>
                        <p><span className="subtableContent">Email:</span> {userData.Email}</p>
                        <p><span className="subtableContent">Department:</span> {userData.Department}</p>
                        <p><span className="subtableContent">Hostel:</span> {userData.HostelName}</p> 
                    </div>
                </div>
            </div>
            <div>
                <h3 onClick={(e)=>{dropDownMenu("HomePageUserCommentsLeft","SpanTitleCommentsLeft")}} className="TitleDescriptionHomePage">Comments on my profile <span class="material-symbols-outlined" id="SpanTitleCommentsLeft">expand_less</span></h3>
                <div id="HomePageUserCommentsLeft">
                    {userData.CommentsToMe.length===0?<p>Users haven't left a comment on your profile</p>:userData.CommentsToMe.map(x=><CommentToData commentDetails={x} setNewUserUpdated={setNewUserUpdated}/>)}
                </div>
            </div>
            <div>
                <h3 onClick={(e)=>{dropDownMenu("HomePageUserCommentsReceived","SpanTitleCommentsReceived")}} className="TitleDescriptionHomePage">Comments you left <span class="material-symbols-outlined" id="SpanTitleCommentsReceived">expand_less</span></h3>
                <div id="HomePageUserCommentsReceived" className="dropDownBigDiv">
                    {userData.CommentsByMe.length===0?<p>Leave a comment on a users profile to make this profile</p>:userData.CommentsByMe.map(x=><CommentByData commentDetails={x} setNewUserUpdated={setNewUserUpdated}/>)}
                </div>
            </div>
            <Link to="./editPage" className="editProfileButton">Edit Profile</Link>
        </div>
    )
}
export default DefaultHomePage