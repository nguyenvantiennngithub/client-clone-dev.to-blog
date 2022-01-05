import './ContainerComment.scss'
import { BsFillSuitHeartFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {FaRegComment} from 'react-icons/fa'

import {FiMoreHorizontal} from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Comment from '../Comment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { comment, heartComment, hideReply, showReply, showReplyAgain } from '../../../redux/actions';
import useToggle from '../../../hooks/useToggle';
function ContainerComment({data}){
    
    const {cmt, author, isReply, isHide} = data;
    const lengthReply = cmt.reply.length;
    const idParent = (isReply) ? cmt.idReply : cmt._id;

    const dispatch = useDispatch();
    const comments = useSelector(state => state.getPost.data.comment)
    const {user, isVerify, token} = useSelector(state => state.loginUser)
    
    var [isShowComment, setIsShowComment] = useState(false);
    var [isShowDropdown, setIsShowDropdown] = useState(false);
    var [isShowMore, setIsShowMore] = useState(true);

    const isLoggedIn = (isVerify && token);//verify is true and token is true is loggedin
    const [isHeart, handleToggleHeart] = useToggle(user.username, cmt.heart, isLoggedIn, heartComment.heartCommentRequest, {id: cmt._id})
    console.log(isHeart);
    function handleReply(){
        setIsShowComment(true);
    }

    function handleToggleDropdown(){
        setIsShowDropdown(!isShowDropdown)
    }

    function checkReplyLoaded(){
        return comments.find(item =>{
            return cmt.reply.includes(item.cmt._id);
        })
    }

    function handleShowReply(){
        if (isShowMore){
            if (!checkReplyLoaded()){
                dispatch(showReply.showReplyRequest(cmt._id))
            }else{
                dispatch(showReplyAgain(cmt.reply))
            }
            setIsShowMore(false);
        }else{
            dispatch(hideReply(cmt.reply))
            setIsShowMore(true);
        }
    }


    

    return (
        <div className= {isReply ? "ccomment reply" : "ccomment"} hidden={isHide} >
            <div className="ccomment__forgot">
                <div className="ccomment__avatar">
                    <img
                        src={author.avatar}
                        alt={"avatar of " + author.displayName}
                        className="ccomment__avatar-img"
                    />
                </div>

                <div className='ccomment__content'>
                    <div className='ccomment__content-info'>
                        <div className='ccomment__content-info-left'>
                            <Link to="/" className='link'>
                                <span className='ccomment__content-info-left-username'>{author.displayName}</span>
                            </Link>
                            <span className='ccomment__content-info-left-date'>{moment(cmt.createdAt).format("MMM M")}</span>
                        </div>
                        <div className='ccomment__content-info-right' onClick={handleToggleDropdown}>
                            <FiMoreHorizontal className='ccomment__content-info-right-icon'></FiMoreHorizontal>
                            {isShowDropdown && (
                                <div className='ccomment__content-info-right-dropdown'>
                                    <div className='ccomment__content-info-right-dropdown-item'>
                                        <span className='ccomment__content-info-right-dropdown-item-text'>Hihi</span>
                                    </div>
                                    <div className='ccomment__content-info-right-dropdown-item'>
                                        <span className='ccomment__content-info-right-dropdown-item-text'>Hihi</span>
                                    </div>
                                    <div className='ccomment__content-info-right-dropdown-item'>
                                        <span className='ccomment__content-info-right-dropdown-item-text'>Hihi</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className='ccomment__content-text'>{cmt.comment}</span>
                </div>
            </div>
            {
                lengthReply > 0 &&
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
                    <Comment isReply={true} setIsShowComment={setIsShowComment} idParent={idParent}></Comment>
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
        
                        <div className='ccomment__footer-container'>
                            <FaRegComment className='ccomment__footer-container-icon rotate'></FaRegComment>
                            <span className='ccomment__footer-container-text' onClick={handleReply}>Reply</span>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default ContainerComment;