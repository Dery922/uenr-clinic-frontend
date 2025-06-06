import { Link } from "react-router-dom";

const Notfound = () => {
    return(
     
    <div class="main-wrapper error-wrapper">
        <div class="error-box">
            <h1>404</h1>
            <h3><i class="fa fa-warning"></i> Oops! Page not found!</h3>
            <p>The page you requested was not found.</p>
            <Link to="/" class="btn btn-primary go-home">Go to Home</Link>
        </div>
    </div>
    
    )
}

export default Notfound;