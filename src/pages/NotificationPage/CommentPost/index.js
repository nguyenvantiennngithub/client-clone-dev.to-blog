import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import './CommentPost.scss'
import '../NewPost/NewPost.scss'
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import {FaRegComment} from 'react-icons/fa'
import {GrView} from 'react-icons/gr'
import { useEffect, useState } from 'react';
import Comment from '../../../components/Discussion/Comment';
import useToggle from '../../../hooks/useToggle';
import { heartComment, seenNotification } from '../../../redux/actions';
import { typeUpdateComment } from '../../../redux/constants';

function CommentPost({data}){
    const navigate = useNavigate();
    const {comment, author, parentComment, post, notifi} = data;
    const {user, isVerify, token} = useSelector(state => state.loginUser)
    const [isShowComment, setIsShowComment] = useState(false);//comment is reply
    const isLoggedIn = (isVerify && token);//verify is true and token is true is loggedin
    const [isHeart, handleToggleHeart] = useToggle(user.username, comment.heart, isLoggedIn, heartComment.heartCommentRequest, {id: comment._id}, typeUpdateComment.notification)
    var idParent;
    if (parentComment){
        if (parentComment.idReply) idParent = parentComment.idReply
        else idParent = parentComment._id
    }else{
        idParent = comment._id;
    }
    const isReaded = notifi.seen.includes(user.username);

    const dispatch = useDispatch();
    useEffect(()=>{
        if (!isReaded){
            //dispatch to dosomeing
            dispatch(seenNotification({username: user.username, id: notifi._id}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    function handleShowComment(){
        setIsShowComment(!isShowComment);
    }

    function handleNavigateComment(){
        navigate(`/post/${post.slug}#${comment._id}`)
    }

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
                    <Link className="newPost__right-title" to={"/user/" + comment.author}>{author.displayName}</Link>
                    {!parentComment && " commented on "}
                    {parentComment && comment?.replyClosest?.username === user?.username && " replied your comment in "}
                    {parentComment && comment?.replyClosest?.username !== user?.username &&  " replied to a comment in "}
                    <Link className="newPost__right-title" to={"/post/" + post.slug}>{post.title}</Link>

                </span>
                <div className="newPost__right-container">
                    <span className="newPost__right-date">{moment(comment.createdAt).fromNow()}</span>
                </div>
                {
                    parentComment && (
                        <div className='newPost__reply'>
                            <Link className='newPost__reply-content' to={'/post/' + post.slug + '#' + parentComment._id}>
                                <span className='newPost__reply-content-label'>Reply: </span>
                                {parentComment.comment}
                            </Link>
                        </div>
                    )
                }
                <div className='newPost__comment'>
                    <div className='newPost__comment-top'>
                        <Link className='newPost__comment-top-container small' to={"/post/" + comment.slug + "#" + comment._id}>
                            {comment.comment}
                        </Link>
                    </div>
                    <div className='newPost__comment-bottom commentPost'>
                        <div className='newPost__comment-bottom-container' onClick={handleToggleHeart}>
                            {(isHeart) ? <BsFillSuitHeartFill className="newPost__comment-bottom-icon heart"/>
                                :<BsSuitHeart className="newPost__comment-bottom-icon"/> 
                            }
                            <span>{comment.heart.length} Like</span>
                        </div>

                        <div className='newPost__comment-bottom-container' onClick={handleShowComment}>
                            <FaRegComment className="newPost__comment-bottom-icon rotate90"/> 
                            <span>Reply</span>
                        </div>

                        <div className='newPost__comment-bottom-container' onClick={handleNavigateComment}>
                            <GrView className="newPost__comment-bottom-icon"/> 
                            <span>View</span>
                        </div>
                    </div>
                </div>
                {
                    isShowComment && (
                        <Comment
                            isEdit={false}
                            isReply={true}
                            setIsShowComment={setIsShowComment}
                            idParent={idParent}
                            displayNameParent={author.displayName}
                            cmt={comment}
                        />
                    )
                }
            </div>
        </div>
        
    )
}

export default CommentPost