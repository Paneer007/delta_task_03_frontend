import axios from "axios"
import { useEffect ,useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import validateUserToken from "../../utils/tokenHelper"
const UserProfileCard = ({profile})=>{
    {/* Click the profile to know more about a person, try making it a like a pop up display or something :> */}
    return(
        <Link to={`./${profile._id}`}>
            <div className="ProfileCard">
                <div>
                    Image
                </div>
                <div>
                    <p>{profile.Name}</p>
                    <p>{profile.Username}</p>
                    <p>{profile.RollNo}</p>
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
            const resp = await axios.get('http://localhost:3001/api/userdata/allusers',{headers:{'authorization':token,'content-type':'application/json'}})
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
        <div>
            <div>
                <input onChange={({target})=>setSearch(target.value)}/>
            </div>
            <div className="UserCardsMainDiv">
                {finalList.map(x=><UserProfileCard profile={x._doc}/>)}
            </div>
        </div>
    )
}
export default UserListPage