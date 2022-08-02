import axios from "axios"
import { useEffect ,useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import validateUserToken from "../../utils/tokenHelper"
const UserProfileCard = ({profile})=>{
    const [show,setShow] = useState(false)
    if(show){
        return(
            <Link className="PCText" to={`./${profile._id}`} onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)}>
            <div className="ProfileCard ShowMoreText">
                <div>
                    Show more
                </div>
            </div>
        </Link>
        )
    }
    {/* Click the profile to know more about a person, try making it a like a pop up display or something :> */}
    return(
        <Link className="PCText" to={`./${profile._id}`} onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)}>
            <div className="ProfileCard">
                <div>
                    <p><span className="subtableContent">Name:</span> {profile.Name}</p>
                    <p><span className="subtableContent">Username:</span> {profile.Username}</p>
                    <p><span className="subtableContent">Roll No:</span> {profile.RollNo}</p>
                </div>
            </div>
        </Link>
        
    )
}
const UserListPage=()=>{
    const [profileList,setProfileList] = useState([])
    const [buffer,setBuffer] = useState(true)
    const [search,setSearch] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        validateUserToken(navigate)
        const token = window.localStorage.getItem('token')
        const getListOfUsers=async()=>{
            const resp = await axios.get('/api/userdata/allusers',{headers:{'authorization':token,'content-type':'application/json'}})
            setProfileList(resp.data)
            setBuffer(false)
        }
        getListOfUsers()
    },[])
    const finalList = profileList.filter(x=>x._doc.Name.includes(search))
    if(buffer){
        return(
            <div>
                Please wait
            </div>
        )
    }
    return(
        <div className="UserSearchPage">
            <div className="SearchBarDiv">
                <span className="material-symbols-outlined">search</span>
                <input className="SearchBarStyling" placeholder="Search for a profile" value={search||''} onChange={({target})=>setSearch(target.value)}/>
                <span className="material-symbols-outlined searchBarDeleteElement" onClick={()=>{setSearch('')}}>close</span>
            </div>
            <div className="UserCardsMainDiv">
                {finalList.map(x=><UserProfileCard profile={x._doc}/>)}
            </div>
        </div>
    )
}
export default UserListPage