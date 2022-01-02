import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {clearPostAuthor, getPost} from '../../redux/actions'
import {Col, Container, Row} from 'reactstrap'
import './PostDetail.scss'
import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";
import LoadingError from "../../components/LoadingError";
function PostDetail(){
    const {slug} = useParams();
    const dispatch = useDispatch();

    var {data, isLoading, isLoaded, isError} = useSelector((state)=>{
        return state.getPost
    })
    var {user, isVerify, token} = useSelector((state) =>{
        return state.loginUser
    })
    const isLoggedIn = (isVerify && token);//verify is true and token is true is loggedin
    const {post, author} = data;

    useEffect(()=>{
        dispatch(getPost.getPostRequest(slug))
       return ()=>{
            dispatch(clearPostAuthor());
       }
    }, [dispatch, slug])


    
    return (
        <LoadingError data={{isLoading, isLoaded, isError}}>
            <div className="postDetail">
                <Container>
                    <Row>
                        <Col xs="1">
                            <Left post={post} isLoggedIn={isLoggedIn} user={user}/>
                        </Col>

                        <Col xs="8">
                            <Mid post={post} author={author}/>
                        </Col>

                        <Col xs="3" className="postDetail__right-fixed">
                            <Right author={author} isLoggedIn={isLoggedIn} user={user}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LoadingError>
    )
    
}


export default PostDetail;