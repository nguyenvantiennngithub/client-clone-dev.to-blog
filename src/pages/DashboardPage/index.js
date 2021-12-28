import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route, Routes, useParams } from "react-router-dom"
import { Col, Container, Row, Spinner } from "reactstrap"
import { getPersonalPosts } from "../../redux/actions"
import './Dashboard.scss'
import Followers from "./Followers"
import Following from "./Following"
import ListPost from "./ListPost"

function DashboardPage(){
    const dispatch = useDispatch();
    const params = useParams()
    const path = params['*'];
    useEffect(()=>{
        dispatch(getPersonalPosts.getPersonalPostsRequest('created-desc'));
    }, [dispatch])


    const {user, isLoading, isError, isVerify} = useSelector(state => state.loginUser)
    const personal = useSelector(state => state.getPersonalPosts)


    if (isLoading || !isVerify || personal.isLoading || !personal.isLoaded){
        return <Spinner>Loading...</Spinner>
    }else if (isError || personal.isError){
        return <p>There are some problems</p>;
    }
    return (
        <div className="dashboard">
            <Container>
                <h2 className="dashboard-title">Dashboard</h2>
                <Row>
                    <Col xs="3">
                        <div className="dashboard__list">
                            <Link to="/dashboard" className="dashboard__list-item-link">
                                <div className={(path==='') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">Posts</span>
                                    <div className="dashboard__list-item-count-container">
                                        <span className="dashboard__list-item-count">{user.posts.length}</span>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link to="/dashboard/followers" className="dashboard__list-item-link">
                                <div className={(path==='followers') ? 'dashboard__list-item active' : 'dashboard__list-item'} >

                                    <span className="dashboard__list-item-text">Followers</span>
                                    <div className="dashboard__list-item-count-container">
                                        <span className="dashboard__list-item-count">{user.followers.length}</span>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/dashboard/following" className="dashboard__list-item-link">
                             <div className={(path==='following') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">Following</span>
                                    <div className="dashboard__list-item-count-container">
                                        <span className="dashboard__list-item-count">{user.following.length}</span>
                                    </div>
                            </div>
                            </Link>

                        </div>
                    </Col>
                    <Col xs="9">
                        <Routes>
                            <Route path="/" exact element={<ListPost />}></Route>
                            <Route path="/followers" element={<Followers/>}></Route> 
                            <Route path="/following" element={<Following/>} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default DashboardPage