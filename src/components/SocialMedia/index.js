import './SocialMedia.scss'
import {Button} from 'reactstrap'
import {BsFacebook, BsGoogle} from 'react-icons/bs'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {loginSocial} from '../../redux/actions/auth'
function SocialMedia(props){
    const Form = props.form
    const {errorMessages} = props
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function responseFacebook(res){
        if (res.userID){
            dispatch(loginSocial.loginSocialRequest({username: res.userID, displayName: res.name, email: res.email, avatar: res.picture.data.url, navigate: url => navigate(url)}))
        }
    }

    function responseGoogle(res){
        dispatch(loginSocial.loginSocialRequest({username: res.profileObj.googleId, displayName: res.profileObj.givenName, email: res.profileObj.email, avatar: res.profileObj.imageUrl, navigate: url => navigate(url)}))
    }


    return (
        <div className="socialMedia">
            <div className="socialMedia-layout">
                <div className="socialMedia__container">
                    <h2 className="socialMedia__header">Welcome to VanTiennn's Blog</h2>
                    <FacebookLogin 
                        appId={process.env.REACT_APP_FACEBOOK_ID}
                        callback={responseFacebook}
                        fields="name,email,picture"
                        render={(props)=>{
                            return (
                                <Button className="socialMedia__btn facebook" block onClick={props.onClick} disabled={props.disabled}>
                                    <BsFacebook className="socialMedia__btn-icon"/>
                                    Login with Facebook
                                </Button>
                            )
                        }}
                    > 
                    </FacebookLogin>

                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        render={renderProps => (
                            <Button className="socialMedia__btn google" block onClick={renderProps.onClick} disabled={renderProps.disabled}> 
                                <BsGoogle className="socialMedia__btn-icon"/>
                                Login with Google
                            </Button>
                        )}
                        onSuccess={responseGoogle}
                    />,
                    
                    <hr/>
                    <div>
                        <Form errorMessages={errorMessages}></Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialMedia;