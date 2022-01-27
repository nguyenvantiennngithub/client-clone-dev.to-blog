import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {signOut} from '../../../../redux/actions/'
import './Avatar.scss'
import socket from '../../../../utils/socket';

function Avatar(){
    var [isShowDropDown, setIsShowDropDown] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.loginUser);
    const handleToggleDropDown = function (){
        setIsShowDropDown(!isShowDropDown);
    }

    const handleSignOut = function(){
        dispatch(signOut());
        socket.emit("logout success")
        navigate('/login')
    }
    return (
        <div>
           <div className="avatar">
               <div 
                    className="avatar__image" 
                    style={{backgroundImage: `url(${user.avatar})`}}
                    onClick={handleToggleDropDown}>
               </div>
               
               {isShowDropDown && 
               <div className="avatar__dropdown">    
                    <div className="avatar__dropdown-item">
                        <Link 
                            onClick={handleToggleDropDown}
                            className="avatar__dropdown-item-text bold"
                            to={"/user/" + user.username}
                        >
                            {user && user.displayName}
                        </Link>
                    </div>

                    <hr style={{margin: '4px'}}/>
                    
                    <div className="avatar__dropdown-item">
                        <Link 
                            onClick={handleToggleDropDown}
                            className="avatar__dropdown-item-text"
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div className="avatar__dropdown-item">
                        <Link 
                            onClick={handleToggleDropDown}
                            className="avatar__dropdown-item-text"
                            to="/create-post"
                        >
                            Create post
                        </Link>
                    </div>
                    <hr style={{margin: '4px'}}/>
                    <div className="avatar__dropdown-item">
                        <Link 
                            onClick={handleToggleDropDown}
                            className="avatar__dropdown-item-text"
                            to="/settings"
                        >
                            Settings
                        </Link>
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