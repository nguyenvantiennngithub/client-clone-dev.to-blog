import { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../../redux/actions/'
import {typeUpdateReaction} from '../../redux/constants'
import LoadingError from '../../components/LoadingError/'
import Post from './Post'
import './HomePage.scss'
function HomePage(){
    const dispatch = useDispatch();
    
    const {data, isLoading, isLoaded, isError} = useSelector((state) =>{
        return state.getPosts
    })

    

    useEffect(()=>{
        dispatch(getPosts.getPostsRequest());
        return ()=>{
            window.scrollTo(0, 0)
        }
    }, [dispatch])
    

    return (
        <LoadingError data={{isLoading, isLoaded, isError}}>
            <div className="home">
                <Container>
                    <Row>
                        <Col xl="8" lg="9" md="12" sm="12">
                            <div className="home__listPost">
                                {
                                    data.map((item, index)=>{
                                        return <Post key={index} data={item} typeUpdateReaction={typeUpdateReaction.posts}/>
                                    })
                                }
                            </div>
                        </Col>
                        <Col xl="2" lg="3" md="0" sm="0">
                            <p>There will be something here later</p>
                        </Col>
                        <Col xl="2" lg="0" md="0" sm="0">
                            <p>There will be something here later</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LoadingError>
    )
    
}

export default HomePage