import moment from 'moment';
import { bookmark, heartPost } from "../../../redux/actions/";
import useToggle from '../../../hooks/useToggle'
import { BsFillSuitHeartFill, BsSuitHeart, BsBookmark, BsBookmarkFill} from 'react-icons/bs';
import {FaRegComment} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Post.scss'
import { useSelector } from 'react-redux';

function Post({data}){
    console.log(data)
    const {post, author} = data;
    var {user, isVerify, token} = useSelector((state) =>{
        return state.loginUser
    })
    const username = user && user.username;
    const isLoggedIn = (isVerify && token);//verify is true and token is true is loggedin


    const [isHeart, handleToggleHeart] = useToggle(username, post.heart, isLoggedIn, heartPost.heartPostRequest, {slug: post.slug}, true)
    const [isBookmark, handleToggleBookmark] = useToggle(username, post.bookmark, isLoggedIn, bookmark.bookmarkRequest, {slug: post.slug}, true);

    return (
        <div className="post">
            <div className="post__header">
                <div className="post__header-img-container">
                    <img 
                        className="post__header-img"
                        alt={"avatar of " + author.username}
                        src={author.avatar}
                    />
                </div>
                <div className="post__header-info">
                    <span className="post__header-info-username">{author.username}</span>
                    <span className="post__header-info-date">{'Post on ' + moment(post.createdAt).format('ll') + ' (' + moment(post.createdAt).fromNow() + ')'}</span>
                </div>
            </div>

            <h2 className="post__title">
                <Link to={'/post/' + post.slug} className="post__title-link">
                    {post.title}
                </Link>
            </h2>

            <div className="post__tags">
                {/* {post.tags.map((item, index)=>{ */}
                {post.tags.map((item, index)=>{
                    return (
                        <Link to={'/' + item} key={index} className="post__tags-item">
                            <span>#{item}</span>
                        </Link>
                    )
                })}
            </div>
            <div className="post__footer">
                <div className="post__footer-left">
                    <div className="post__footer-left-item" onClick={handleToggleHeart}>
                        {
                            (isHeart) ? <BsFillSuitHeartFill className="post__footer-left-item-icon heart"/>
                                :<BsSuitHeart className="post__footer-left-item-icon" onClick={handleToggleHeart}/>
                        }
                        {post.heart.length + ' hearts'}
                    </div>
                    <div className="post__footer-left-item">
                        <FaRegComment className="post__footer-left-item-icon rotate90"/>
                        Comments
                    </div>
                    
                </div>

                <div className="post__footer-left">
                    <div className="post__footer-left-item" onClick={handleToggleBookmark}> 
                    {
                        (isBookmark) ? <BsBookmarkFill className="post__footer-left-item-icon bookmark"/>
                            :<BsBookmark className="post__footer-left-item-icon"/>
                    }
                    {post.bookmark.length + ' Bookmark'} 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post;