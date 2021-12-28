import { Col } from "reactstrap";
import {Link} from 'react-router-dom'
import './Follow.scss'
function Follow({data}){
    return (
        <Col xs="4">
            <div className="follow">
                <div className="follow__avatar">
                    <Link to={'/user/' + data.username}>
                        <img 
                            className="follow__avatar-img"
                            src={data.avatar}
                            alt={'avatar of' + data.displayName}
                        />
                    </Link>
                </div>    
                <div className="follow__info">
                    <Link to={'/user/' + data.username} className="follow__info-username">{data.displayName}</Link>
                    <span className="follow__info-bio">{data.bio}</span>
                </div>
            </div>
        </Col>
    )
}

export default Follow;