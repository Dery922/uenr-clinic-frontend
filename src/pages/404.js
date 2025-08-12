import { Link } from "react-router-dom";

const Notfound = () => {
    return(
    <div class="main-wrapper error-wrapper">
        <div class="error-box">
            <h1>401</h1>
            <h3><i class="fa fa-warning"></i> Oops! check!</h3>
            <p>Please you are not Authorized to visit this page, please go back.</p>
            <Link to="/" class="btn btn-primary go-home">Go to Home</Link>
        </div>
    </div>
    )
}

export default Notfound;