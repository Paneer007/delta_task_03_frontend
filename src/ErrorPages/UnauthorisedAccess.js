import { Link } from "react-router-dom"
const UnauthorisedAccess = ()=>{
    return(
        <div className="ErrorPage">
            <h2>Unauthorised Access</h2>
            <p>You do not have the valid token to enter here</p>
            <Link to="/login" className="ReturnHome">Return back to login screen</Link>
        </div>
    )
}
export default UnauthorisedAccess