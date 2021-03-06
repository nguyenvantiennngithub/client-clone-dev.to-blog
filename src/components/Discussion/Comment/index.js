import { useEffect, useRef, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import { Button } from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux'
import './Comment.scss'
import { comment, editComment, reply } from '../../../redux/actions';

function Comment({isReply = false, isEdit = false, setIsShowComment, idParent, setIsShowCommentEdit, cmt, displayNameParent}){

    const dispatch = useDispatch();
    var [isActiveTextArea, setIsActiveTextArea] = useState(isReply);
    var [isActiveBtnSubmit, setIsActiveBtnSubmit] = useState(true);
    const {user} = useSelector(state => state.loginUser)
    var inputEle = useRef();
    const params = useParams();
    const slug = params.slug ? params.slug : cmt.slug
    useEffect(()=>{
        if (isReply){
            inputEle.current.focus();
        }
        if (isEdit){
            inputEle.current.value = cmt.comment;
        }
    }, [inputEle, isEdit, isReply, cmt])

    function handleActive(){
        setIsActiveTextArea(true);
    }

    function handleUnActive(){
        if (isReply){
            setIsShowComment(false)
        }else{
            setIsActiveTextArea(false);
        }
        inputEle.current.value = "";
    }
    function handleChangeTextArea(){
        setIsActiveBtnSubmit(inputEle.current.value === "");
    }

    function handleSubmit(){
        if (isEdit){//Edit
            dispatch(editComment.editCommentRequest({id: cmt._id, comment: inputEle.current.value}))
            setIsShowComment(false);
            setIsShowCommentEdit(false);
        }else{
            if (!isReply){//Comment
                dispatch(comment.commentRequest({slug, comment: inputEle.current.value}));
                setIsActiveTextArea(false);
            }else{//Reply
                dispatch(reply.replyRequest(
                    {
                        slug, 
                        idParent,//cái này là cái comment to nhất
                        idParentReply: cmt._id,//cái này là cái id comment mà mình click vô để reply
                        comment: inputEle.current.value, 
                        replyClosest: {
                            username: cmt.author, 
                            displayName: displayNameParent
                        }
                    }
                ))
                setIsShowComment(false);
            }
        }
        inputEle.current.value = "";
        inputEle.current.blur();
    }

    return (
        <div className={ (isReply) ? "comment reply" : "comment" } >
            {
                !isReply && (
                    <Link to={'/user/' + user.username}>
                        <div className="comment__avatar">
                            <img
                                src={user.avatar}
                                alt={"avatar of " + user.displayName}
                                className="comment__avatar-img"
                            />
                        </div>
                    </Link>
                )
            }
           
            <div className="comment__content">
            

                <textarea 
                    className="comment__content-text" 
                    placeholder={cmt ? "Replying to " + displayNameParent : "Add a discusstion"}
                    onClick={handleActive}
                    onChange={handleChangeTextArea}
                    ref={inputEle}
                >
                </textarea>
                {
                    isActiveTextArea && (
                        <div className='comment__content-btn'>
                            <Button 
                                color='danger' outline  
                                className='comment__content-btn-first'
                                onClick={handleUnActive}
                            >
                                Cancel
                            </Button>
                            <Button color='primary' onClick={handleSubmit} disabled={isActiveBtnSubmit}>
                                {isEdit ? "Edit" : "Submit"}
                            </Button>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}

export default Comment;