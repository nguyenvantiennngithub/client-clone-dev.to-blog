import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap"
import { checkItemInList } from "../../../helpers";
import { following } from "../../../redux/actions";

function Right({author}){

    var myUser = useSelector((state)=> state.loginUser.user) || {}
    const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState(checkItemInList(author.username, myUser.following));
    useEffect(()=>{//handle for heart
        setIsFollowing(checkItemInList(author.username, myUser.following))
    }, [author, myUser])

    function handleToggleFollowing(){//handle onclick toggle Following
        dispatch(following.followingRequest({isFollowing: !isFollowing, author: author.username}))//true is Following and false is unFollowing
        setIsFollowing(!isFollowing);
    }

    return (
        <div className="postDetail__right">
            <div className="postDetail__right-header">
                <div className="postDetail__right-header-container">
                    <img 
                        className="postDetail__right-header-image"
                        src={author.avatar}
                        alt={"avatar of " + author.displayName}    
                    />
                </div>
                <div className="postDetail__right-header-container">
                    <span className="postDetail__right-header-name">{author.displayName || author.username}</span>
                </div>
            </div>
            {
                (author.username === myUser.username) ? 
                    <Button  className="postDetail__right-follow" color="primary" block>Edit profile</Button>
                :        
                    (isFollowing) ?
                            <Button  className="postDetail__right-follow" onClick={handleToggleFollowing} color="secondary" block>Following</Button>
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