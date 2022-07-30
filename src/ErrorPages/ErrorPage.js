import { Link } from "react-router-dom"
const ErrorPage=()=>{
    return(
        <div>
            <p>Error</p>
            <p>Something went wrong</p>
            <p>Please try again</p>
            <Link to="/login">Return back to login screen</Link>
        </div>
    )
}
export default ErrorPage