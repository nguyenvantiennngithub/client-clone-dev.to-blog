import './ContainerComment.scss'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {FaRegComment} from 'react-icons/fa'
import {FiMoreHorizontal} from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Comment from '../Comment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, heartComment, hideReply, showReply, showReplyAgain } from '../../../redux/actions';
import useToggle from '../../../hooks/useToggle';
import { typeUpdateComment } from '../../../redux/constants';
function ContainerComment({data}){
    const {cmt, author, isReply, isHide} = data;
    const lengthNewReply = cmt.newReply ? cmt.newReply.length : 0;
    const lengthReply = cmt.reply.length - lengthNewReply;
    const idParent = (isReply) ? cmt.idReply : cmt._id;
    const dispatch = useDispatch();
    const comments = useSelector(state => state.getPost.data.comment)
    const {user, isVerify, token} = useSelector(state => state.loginUser)
    const hash = window.location.hash;
    const containerCommentEle = useRef();
    const isScrollTo = window.location.href.includes('#' + cmt._id);
    
    useEffect(()=>{
        if (isScrollTo){
            window.scrollTo(0, containerCommentEle.current.offsetTop - 100);
        }
        else if (cmt.reply.includes(hash.substring(1))){
            handleShowReply();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // containerCommentEle, cmt._id, cmt.reply, hash
    
    var [isShowComment, setIsShowComment] = useState(false);
    var [isShowDropdown, setIsShowDropdown] = useState(false);
    var [isShowCommentEdit, setIsShowCommentEdit] = useState(false);
    var [isShowMore, setIsShowMore] = useState(true);

    const isLoggedIn = (isVerify && token);//verify is true and token is true is loggedin
    const [isHeart, handleToggleHeart] = useToggle(user.username, cmt.heart, isLoggedIn, heartComment.heartCommentRequest, {id: cmt._id}, typeUpdateComment.post)
    function handleReply(){
        setIsShowComment(true);
        setIsShowCommentEdit(false);
    }
    function handleToggleDropdown(){
        setIsShowDropdown(!isShowDropdown)
    }

    function checkReplyLoaded (){
        var count = 0;
        return comments.find(item =>{
            if (cmt.reply.includes(item.cmt._id)){
                count++;
                if (count > lengthNewReply){
                    return true;
                }
                return false;
            }
            return false;
        })
    }

    function handleShowReply(){
        if (isShowMore){
            if (!checkReplyLoaded()){
                dispatch(showReply.showReplyRequest({id: cmt._id}))
            }else{
                dispatch(showReplyAgain(cmt.reply))
            }
            setIsShowMore(false);
        }else{
            dispatch(hideReply(cmt.reply))
            setIsShowMore(true);
        }
    }

    function handleEditComment(){
        setIsShowCommentEdit(true);
        setIsShowComment(true)
    }
    
    function handleDeleteComment(){
        dispatch(deleteComment.deleteCommentRequest({id: cmt._id, reply: cmt.reply}));
    }

    return (
        <div className= {isReply ? "ccomment reply" : "ccomment"} hidden={isHide} id={cmt._id} ref={containerCommentEle} >
            <div className="ccomment__forgot">
                <div className="ccomment__avatar">
                    <Link to={'/user/' + author.username}>
                        <img
                            src={author.avatar}
                            alt={"avatar of " + author.displayName}
                            className="ccomment__avatar-img"
                        />
                    </Link>
                </div>

                <div className= {isScrollTo ? 'ccomment__content scroll' : 'ccomment__content'}>
                    <div className='ccomment__content-info'>
                        <div className='ccomment__content-info-left'>
                            <Link to={'/user/' + author.username} className='link'>
                                <span className='ccomment__content-info-left-username'>{author.displayName}</span>
                            </Link>
                            <span className='ccomment__content-info-left-date'>{moment(cmt.createdAt).format("MMM DD")}</span>
                        </div>

                        {//... more option to delete or edit
                            user.username === cmt.author && (

                                <div className='ccomment__content-info-right' onClick={handleToggleDropdown}>
                                    <FiMoreHorizontal className='ccomment__content-info-right-icon'></FiMoreHorizontal>
                                    {isShowDropdown && !isShowComment && (
                                        <div className='ccomment__content-info-right-dropdown'>
                                            <div className='ccomment__content-info-right-dropdown-item' onClick={handleEditComment}>
                                                <span className='ccomment__content-info-right-dropdown-item-text'>Edit</span>
                                            </div>
                                            <div className='ccomment__content-info-right-dropdown-item' onClick={handleDeleteComment}>
                                                <span className='ccomment__content-info-right-dropdown-item-text'>Delete</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </div>
                    <span className='ccomment__content-text'>
                        {isReply && cmt.replyClosest && <Link to={'/user/' + cmt.replyClosest.username} className='ccomment__content-text-user'>{cmt.replyClosest.displayName}</Link>}
                        {cmt.comment}
                    </span>
                </div>
            </div>
            {
                (lengthReply) > 0 &&
                    (
                        <div className='ccomment__more' onClick={handleShowReply}>
                            <span className='ccomment__more-text'>
                                
                                {isShowMore ? "View " : "Hide "} {lengthReply} {(lengthReply > 1) ? " replies" : " reply"}
                            </span>
                        </div>
                    )
            }

            {isShowComment ?  
                (
                    <Comment 
                        isReply={true} 
                        setIsShowComment={setIsShowComment} 
                        isEdit={isShowCommentEdit}
                        setIsShowCommentEdit={setIsShowCommentEdit}
                        idParent={idParent}
                        cmt={cmt}
                        displayNameParent={author.displayName}>
                    </Comment>
                )
                :
                (
                    <div className='ccomment__footer'>
                        <div className='ccomment__footer-container' onClick={handleToggleHeart}>
                            {
                                (isHeart) ?
                                    <BsSuitHeartFill className="ccomment__footer-container-icon heart"/>
                                :
                                    <BsSuitHeart className="ccomment__footer-container-icon"/>
                            }
                            <span className='ccomment__footer-container-text'>{cmt.heart.length} Hearts</span>
                        </div>
        
                        <div className='ccomment__footer-container' onClick={handleReply}>
                            <FaRegComment className='ccomment__footer-container-icon rotate'></FaRegComment>
                            <span className='ccomment__footer-container-text'>Reply</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ContainerComment;