import { useEffect, useRef } from "react"
import { Col, Container, Row } from "reactstrap"
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../../redux/actions/'
import {typeUpdateReaction} from '../../redux/constants'
import LoadingError from '../../components/LoadingError/'
import Post from './Post'
import './HomePage.scss'
function HomePage(){
    const dispatch = useDispatch();
    const containerEle = useRef();
    const {data, isLoading, isLoaded, isError, isCanLoad, currentPage} = useSelector((state) =>{
        return state.getPosts
    })

    useEffect(()=>{
        dispatch(getPosts.getPostsRequest({currentPage}));
        return ()=>{
            window.scrollTo(0, 0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(()=>{
        function handleScroll(e){
            var limit = document.body.offsetHeight - window.innerHeight;
            if (limit - window.scrollY === 0 && !isLoading && isCanLoad){
                dispatch(getPosts.getPostsRequest({currentPage}));
            }
        }
        window.addEventListener('scroll', handleScroll);
        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    }, [currentPage, isCanLoad, dispatch, isLoading])

    

    return (
        <LoadingError data={{isLoading, isLoaded, isError}}>
            <div className="home" ref={containerEle}>
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
                            {/* <p>There will be something here later</p> */}
                        </Col>
                        <Col xl="2" lg="0" md="0" sm="0">
                            {/* <p>There will be something here later</p> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </LoadingError>
    )
    
}

export default HomePage