import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {signOut} from '../../../../redux/actions/'
import './Avatar.scss'

const avatar = 'https://res.cloudinary.com/vantiennn/image/upload/v1627620249/uploads/51c4a2b8c5ffcee620d89240991c5910.jpg'
function Avatar(){
    const navigate = useNavigate()
    var [isShowDropDown, setIsShowDropDown] = useState(false);
    const dispatch = useDispatch();

    const handleToggleDropDown = function (){
        setIsShowDropDown(!isShowDropDown);
    }

    const handleSignOut = function(){
        dispatch(signOut());
        navigate('/login')
    }
    return (
        <div>
           <div className="avatar">
               <div 
                    className="avatar__image" 
                    style={{backgroundImage: `url(${avatar})`}}
                    onClick={handleToggleDropDown}>
               </div>
               
               {isShowDropDown && 
               <div className="avatar__dropdown">    
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text bold" to="/">Hihihi</Link>
                    </div>
                    <hr style={{margin: '4px'}}/>
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text" to="/">Hihihi</Link>
                    </div>
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text" to="/">Hihihi</Link>
                    </div>
                    <hr style={{margin: '4px'}}/>
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text" to="/">Hihihi</Link>
                    </div>
                    <div className="avatar__dropdown-item" onClick={handleSignOut}>
                        <span className="avatar__dropdown-item-text">Sign out</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Avatar;