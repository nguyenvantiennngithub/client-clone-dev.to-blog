import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {getPost} from '../../redux/actions'
import {Col, Container, Row, Spinner} from 'reactstrap'
import './PostDetail.scss'
import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";
function PostDetail(){
    const {slug} = useParams();
    const dispatch = useDispatch();

    const {data, isLoading, isLoaded} = useSelector((state)=>{
        return state.getPost
    })
    const {post, author} = data;

    useEffect(()=>{
        dispatch(getPost.getPostRequest(slug))
    }, [dispatch, slug])

    if (isLoading || !isLoaded) {
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }else{
        return (
            <div className="postDetail">
                <Container>
                    <Row>
                        <Col xs="1">
                            <Left post={post} author={author}/>
                        </Col>
    
                        <Col xs="8">
                            <Mid post={post} author={author}/>
                        </Col>
    
                        <Col xs="3" className="postDetail__right-fixed">
                            <Right post={post} author={author}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default PostDetail;