import axios from "axios"
const validateUserToken =async(navigate)=>{
    const token = window.localStorage.getItem('token')
    if(token==null){
        navigate('../../unauthorisedAccess')
        }
    const resp = await axios.get('http://localhost:3001/api/userdata',{headers:{
            'authorization':token,
            'content-type':'application/json'
        }})
    if(resp.status!==200){
        navigate('../../unauthorisedAccess')
    }
    if(resp.data.newAccount==='New'){
        navigate('../newuser')
    }


}
export default validateUserToken