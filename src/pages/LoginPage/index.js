import Login from "../../components/Login";
import SocialMedia from "../../components/SocialMedia";
function LoginPage({errorMessages}){
    return (
        <SocialMedia errorMessages={errorMessages} form={Login}></SocialMedia>
    )
}

export default LoginPage;