import axios from "axios"
import { useEffect,useState } from "react"
import { Navigate,Routes,Route,useNavigate, Link } from "react-router-dom"
import DefaultHomePage from "./HomePages/DefaultHomePage"
import NewUserHomePage from "./HomePages/NewUserHomePage"
import UserListPage from "./UserList/UserList"
import UserDisplayPage from "./UserList/UserDisplayPage"
import EditUserPage from "./HomePages/EditUserPage"
const MainUserPage = ()=>{
    const navigate = useNavigate()
    const [userData, setUserData] = useState()
    const [buffer,setBuffer] = useState(true)
    const [newUserUpdated, setNewUserUpdated]= useState(false)
    useEffect(()=>{
        const getUserData=async()=>{
            const token = window.localStorage.getItem('token')
            if(token==null){
                navigate('../unauthorisedAccess')
            }
            const resp = await axios.get('http://localhost:3001/api/userdata',{headers:{
                'authorization':token,
                'content-type':'application/json'
            }})
            if(resp.status!==200){
                navigate('../unauthorisedAccess')
            }
            setUserData(resp.data)
            if(resp.data.newAccount==='New'){
                navigate('./newuser')
            }
            setBuffer(false)
        }
        getUserData()
    },[])
    useEffect(()=>{
        
        const token = window.localStorage.getItem('token')
        setBuffer(true)
        const getUpdatedUserData =async()=>{
            const resp = await axios.get('http://localhost:3001/api/userdata',{headers:{
                'authorization':token,
                'content-type':'application/json'
            }})
            setBuffer(false)
            setUserData(resp.data)
        }
        if(newUserUpdated===true){
            getUpdatedUserData()
            setNewUserUpdated(false)
        }
    },[newUserUpdated])
    if(buffer){
        return(
            <div>
                <p>Please wait...</p>
            </div>
        )
    }
    return(
        <div className="userHomePageIdea">
            <div className="SideBar">
                <div className="SideBarContent">
                    <Link className="SideBarElement" to="./">About me</Link>
                    <Link className="SideBarElement" to="./userlist">Explore</Link>
                </div>        
            </div>
            <div className="MainContentPage">
                <Routes>
                    <Route path="/" element={<DefaultHomePage userData={userData}/>}/>
                    <Route path="/newuser" element={<NewUserHomePage userData={userData} setNewUserUpdated={setNewUserUpdated}/>}/>
                    <Route path="/userlist" element ={<UserListPage/>}/>
                    <Route path="/userlist/:userId" element ={<UserDisplayPage/>}/>
                    <Route path="/editPage" element ={<EditUserPage userData={userData} setNewUserUpdated={setNewUserUpdated}/>}/>
                </Routes>
            </div>
            
        </div>
    )
}
export default MainUserPage