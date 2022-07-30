import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const greetingLogic =()=>{
    let date = new Date()
    let hour = date.getHours()
    if(hour<12){
        return "Good morning"
    }else if(hour===12){
        return "Good noon"
    }else if (hour <18){
        return "Good Afternoon"
    }else{
        return "Good Evening"
    }
}
const CommentData=({commentDetails})=>{
    //fix this bit
    console.log(commentDetails)
    const [who,setWho] = useState('')
    const [buffer,setBuffer]= useState(true)
    useEffect(()=>{
        const getSenderData = async()=>{
            const token = window.localStorage.getItem('token')
            const resp = await axios.get(`http://localhost:3001/api/userdata/${commentDetails.From}`,{headers:{'authorization':token,'content-type':'application/json'}})
            setWho(resp.data)
            setBuffer(false)
        }
        getSenderData()
    },[])
    const deleteComment =async()=>{
        setBuffer(true)
        const token = window.localStorage.getItem('token')
        const resp = await axios.delete('http://localhost:3001/api/userdata/comment',{headers:{'authorization':token,'content-type':'application/json'},data:{data:commentDetails}})
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
        <div>
            <p>From-{who.Name}</p>
            <div>
                <p>Favorite Day</p>
                <p>{commentDetails.Day}</p>
            </div>
            <div>
                <p>One word to describe me</p>
                <p>{commentDetails.Describe}</p>
            </div>
            <div>
                <p>Favorite Quality about me</p>
                <p>{commentDetails.Quality}</p>
            </div>
            <div>
                <p>Favorite thing about me</p>
                <p>{commentDetails.Thing}</p>
            </div>
            <Link to={`./userlist/${who._id}`}>Link To profile</Link>
            <button onClick={deleteComment}>Delete comment</button>
        </div>
    )
}
const DefaultHomePage=({userData})=>{
    const greeting = greetingLogic()+' '+userData.Name
    console.log(userData)
    return(
        <div>
            <p>{greeting}</p>
            <div>
               <p>About yourself</p>
               {/*Make it as a dropdown menu*/}
                <div>
                    <p>Username: {userData.Username}</p>
                    <p>Roll No: {userData.RollNo}</p>
                    <p>Bio: {userData.Bio}</p>
                    <p>Phone: {userData.Phone}</p>
                    <p>Email: {userData.Email}</p>
                    <p>Department: {userData.Department}</p>
                    <p>Hostel: {userData.HostelName}</p> 
                </div>
            </div>
            <div>
                <p>Comments on my profile</p>
                <div>
                    {userData.CommentsToMe.length===0?<p>Users haven't left a comment on your profile</p>:userData.CommentsToMe.map(x=><CommentData commentDetails={x}/>)}
                </div>
            </div>
            <div>
                <p>Comments you left</p>
                <div>
                {userData.CommentsByMe.length===0?<p>Leave a comment on a users profile to make this profile</p>:userData.CommentsByMe.map(x=><CommentData commentDetails={x}/>)}
                </div>
            </div>
            <Link to="./editPage">Edit Profile</Link>
        </div>
    )
}
export default DefaultHomePage