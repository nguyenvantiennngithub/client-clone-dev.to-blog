import { useEffect, useRef, useState } from 'react';
import {useParams} from 'react-router-dom'
import { Button } from 'reactstrap';
import {useDispatch} from 'react-redux'
import './Comment.scss'
import { comment, reply } from '../../../redux/actions';

function Comment({isReply = false, setIsShowComment, idParent}){

    const dispatch = useDispatch();
    var [isActiveTextArea, setIsActiveTextArea] = useState(isReply);
    var [isActiveBtnSubmit, setIsActiveBtnSubmit] = useState(true);
    var inputEle = useRef();
    const {slug} = useParams();

    useEffect(()=>{
        if (isReply){
            inputEle.current.focus();
        }
    }, [inputEle, isReply])

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
        if (!isReply){
            dispatch(comment.commentRequest({slug, comment: inputEle.current.value}));
            setIsActiveTextArea(false);
        }else{
            dispatch(reply.replyRequest({slug, comment: inputEle.current.value, idParent}))
            setIsShowComment(false);
        }
        inputEle.current.value = "";
        inputEle.current.blur();
    }

    return (
        <div className={ (isReply) ? "comment reply" : "comment" } >
            {
                !isReply && (
                    <div className="comment__avatar">
                        <img
                            src="http://res.cloudinary.com/vantiennn/image/upload/v1640962647/BlogProject/Post/7418aedf613f30b0d194916cdfd06481.jpg"
                            alt=""
                            className="comment__avatar-img"
                        />
                    </div>
                )
            }
           
            <div className="comment__content">
                <textarea 
                    className="comment__content-text" 
                    placeholder='Add to the disscussion'
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
                            <Button color='primary' onClick={handleSubmit} disabled={isActiveBtnSubmit}>Submit</Button>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}

export default Comment;