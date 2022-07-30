import { Link } from "react-router-dom"
const UnauthorisedAccess = ()=>{
    return(
        <div>
            <p>Unauthorised Access</p>
            <p>You do not have the valid token to enter here</p>
            <Link to="/login">Return back to login screen</Link>

        </div>
    )
}
export default UnauthorisedAccess