import { Button } from "reactstrap"
import { following } from "../../../redux/actions";
import useToggle from '../../../hooks/useToggle'
import { typeUpdateFollow } from "../../../redux/constants";
import { Link } from "react-router-dom";
function Right({author, isLoggedIn, user}){

    const username = user && user.username;
    const userFollowing = user && user.following;
    const [isFollowing, handleToggleFollowing] = useToggle(author.username, userFollowing, isLoggedIn, following.followingRequest, {author: author.username}, typeUpdateFollow.post)

    return (
        <div className="postDetail__right">
            <div className="postDetail__right-header">
                <div className="postDetail__right-header-container">
                    <Link to={'/user/' + user.username}>
                        <img 
                            className="postDetail__right-header-image"
                            src={author.avatar}
                            alt={"avatar of " + author.displayName}    
                        />
                    </Link>
                </div>
                <div className="postDetail__right-header-container">
                    <Link to={'/user/' + user.username} className="postDetail__right-header-name">
                        <span>{author.displayName || author.username}</span>
                    </Link>
                </div>
            </div>
            {
                (author.username === username) ? <Link to={'/settings'}><Button className="postDetail__right-follow" color="primary" block>Edit profile</Button></Link>
                    :        
                    (isFollowing) ? <Button  className="postDetail__right-follow" onClick={handleToggleFollowing} color="secondary" block>Following</Button>
                        :
                        <Button  className="postDetail__right-follow" onClick={handleToggleFollowing} color="primary" block>Follow</Button>
            }
            
            <div className="postDetail__right-footer">
                <span className="postDetail__right-footer-content">{author.bio}</span>
            </div>
        </div>
    )
}

export default Right