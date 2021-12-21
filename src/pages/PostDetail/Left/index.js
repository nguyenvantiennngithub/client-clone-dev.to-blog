import { BsBookmark, BsBookmarkFill, BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { bookmark, heartPost } from "../../../redux/actions";
import useToggle from '../../../hooks/useToggle'
function Left({post, isLoggedIn, user}){

    const username = user && user.username;
    const [isHeart, handleToggleHeart] = useToggle(username, post.heart, isLoggedIn, heartPost.heartPostRequest, {slug: post.slug})
    const [isBookmark, handleToggleBookmark] = useToggle(username, post.bookmark, isLoggedIn, bookmark.bookmarkRequest, {slug: post.slug});

    
    return (
        <div className="postDetail__left-fixed">
            <div className="postDetail__left">
                <div className="postDetail__left-container">
                    {
                        (isHeart) ? 
                            <BsFillSuitHeartFill onClick={handleToggleHeart} className="postDetail__left-item heart"/>
                        : 
                            <BsSuitHeart onClick={handleToggleHeart} className="postDetail__left-item"/> 
                    }
                    <span>{post.heart.length}</span>
                </div>
                <div className="postDetail__left-container">
                    {
                        (isBookmark) ?
                            <BsBookmarkFill onClick={handleToggleBookmark} className="postDetail__left-item bookmark"/>
                        :
                            <BsBookmark onClick={handleToggleBookmark} className="postDetail__left-item"/>
                    }
                    <span>{post.bookmark.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Left;