import moment from 'moment';
import { Link } from 'react-router-dom';
import './NewPost.scss'
import { BsBookmark, BsBookmarkFill, BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import useToggle from '../../../hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { bookmark, heartPost, seenNotification } from '../../../redux/actions';
import { typeUpdateReaction } from '../../../redux/constants';
import { useEffect } from 'react';
function NewPost({data}){
    const {post, author, notifi} = data;
    const {user, isVerify, token} = useSelector(state => state.loginUser)
    const isLoggedIn = (isVerify && token);//verify is true and token is true is loggedin
    const isReaded = notifi.seen.includes(user.username);

    const [isHeart, handleToggleHeart] = useToggle(user.username, post.heart, isLoggedIn, heartPost.heartPostRequest, {slug: post.slug}, typeUpdateReaction.notificationPosts)
    const [isBookmark, handleToggleBookmark] = useToggle(user.username, post.bookmark, isLoggedIn, bookmark.bookmarkRequest, {slug: post.slug}, typeUpdateReaction.notificationPosts);

    const dispatch = useDispatch();
    useEffect(()=>{
        if (!isReaded){
            //dispatch to dosomeing
            dispatch(seenNotification({username: user.username, id: notifi._id}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={isReaded ? 'newPost' : 'newPost unread'}>
            <div className="newPost__left">
                <Link to={"/user/" + author.username}>
                    <img
                        className="newPost__left-img"
                        src={author.avatar}
                        alt={"avatar of " + author.displayName}
                />
                </Link>
            </div>

            <div className="newPost__right">
                
                <span>
                    <Link className="newPost__right-title" to={"/user/" + post.author}>{author.displayName + " "}</Link>
                    make a new post
                </span>
                <div className="newPost__right-container">
                    <span className="newPost__right-date">{moment(post.createdAt).fromNow()}</span>
                </div>

                <div className='newPost__comment'>
                    <div className='newPost__comment-top'>
                        <Link className='newPost__comment-top-container' to={"/post/" + post.slug}>
                            {post.title}
                        </Link>
                    </div>
                    <div className='newPost__comment-bottom'>
                        <div className='newPost__comment-bottom-container' onClick={handleToggleHeart}>
                            {(isHeart) ? <BsFillSuitHeartFill className="newPost__comment-bottom-icon heart"/>
                                :<BsSuitHeart className="newPost__comment-bottom-icon"/> 
                            }
                            <span>{post.heart.length} Like</span>
                        </div>
                        <div className='newPost__comment-bottom-container' onClick={handleToggleBookmark}>
                            {(isBookmark) ? <BsBookmarkFill className="newPost__comment-bottom-icon bookmark"/>
                                :<BsBookmark className="newPost__comment-bottom-icon"/> 
                            }
                            <span>{post.bookmark.length} Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost;