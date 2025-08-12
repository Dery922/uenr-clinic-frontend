import { Link } from "react-router-dom";

const ForgottenPassword = () => {
    return(
        <div class="main-wrapper account-wrapper">
        <div class="account-page">
			<div class="account-center">
                <div class="account-box">
                    <form class="form-signin" action="#">
						<div class="account-logo">
                           
                        <img src="/img/logo-dark.png" alt="" />
                        </div>
                        <div class="form-group">
                            <label>Enter Your Email</label>
                            <input type="text" class="form-control" autoFocus />
                        </div>
                        <div class="form-group text-center">
                            <button class="btn btn-primary account-btn" type="submit">Reset Password</button>
                        </div>
                        <div class="text-center register-link">
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </form>
                </div>
			</div>
        </div>
    </div>
    )
}

export default ForgottenPassword;