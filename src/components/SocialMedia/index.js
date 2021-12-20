import './SocialMedia.scss'
import {Button} from 'reactstrap'
import {BsFacebook, BsGoogle} from 'react-icons/bs'
function SocialMedia(props){
    const Form = props.form
    return (
        <div className="socialMedia">
            <div className="socialMedia-layout">
                <div className="socialMedia__container">
                    <h2 className="socialMedia__header">Welcome to VanTiennn's Blog</h2>
                    <Button className="socialMedia__btn facebook" block> 
                        <BsFacebook className="socialMedia__btn-icon"/>
                        Login with Facebook
                    </Button>
                    <Button className="socialMedia__btn google" block> 
                        <BsGoogle className="socialMedia__btn-icon"/>
                        Login with Google
                    </Button>
                    <hr/>
                    <div>
                        <Form></Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialMedia;