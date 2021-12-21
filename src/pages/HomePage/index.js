import { useEffect } from "react"
import { Col, Container, Row, Spinner } from "reactstrap"
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../../redux/actions/'
import Post from './Post'
import './HomePage.scss'
function HomePage(){
    const dispatch = useDispatch();
    
    const {data, isLoading, isLoaded, isError} = useSelector((state) =>{
        return state.getPosts
    })

    

    useEffect(()=>{
        dispatch(getPosts.getPostsRequest());
    }, [dispatch])
    
    if (isLoading || !isLoaded){
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }else if (isError){
        return <p>There are some problems</p>
    }else{
        return (
            <div className="home">
                <Container>
                    <Row>
                        <Col xl="6" md="8" sm="12">
                            <div className="home__listPost">
                                {
                                    data.map((item, index)=>{
                                        console.log(item)
                                        return <Post key={index} data={item} />
                                    })
                                }
                            </div>
                        </Col>
                        <Col xs="4" md="4" sm="0">
                            <p>There will be something here later</p>
                        </Col>
                        <Col xs="2" md="0" sm="0">
                            <p>There will be something here later</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default HomePage