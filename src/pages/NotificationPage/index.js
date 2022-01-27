import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux'
import './NotificationPage.scss'
import '../DashboardPage/Dashboard.scss'
import LoadingError from "../../components/LoadingError"
import Switch from './Switch';
import { useEffect } from 'react';
import { updateUnreadNotification } from '../../redux/actions';
import { typeNotification } from '../../redux/constants';

function NotificationPage(){
    const params = useParams()
    const dispatch = useDispatch();

    const path = params['*'];
    const {isLoading, isLoaded, isError, data} = useSelector(state => state.notification)

    useEffect(()=>{
        dispatch(updateUnreadNotification());
        return ()=>{
            dispatch(updateUnreadNotification());
        }
    }, [dispatch])
    return (
        <LoadingError data={{isLoading, isLoaded, isError}}>
            <div className='dashboard'>
                <Container>
                <Row>
                    <Col xl="3">
                        <h2 className="dashboard-title">Dashboard</h2>
                        <div className="dashboard__list">
                            <Link to="/notification" className="dashboard__list-item-link">
                                <div className={(path==='') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">All</span>
                                </div>
                            </Link>
                            <Link to="/notification/reactions" className="dashboard__list-item-link">
                                <div className={(path==='reactions') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">Reactions</span>
                                </div>
                            </Link>

                            <Link to="/notification/posts" className="dashboard__list-item-link">
                                <div className={(path==='posts') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">Posts</span>
                                </div>
                            </Link>

                            <Link to="/notification/comments" className="dashboard__list-item-link">
                                <div className={(path==='comments') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">Comment</span>
                                </div>
                            </Link>

                        </div>
                    </Col>
                    <Col xl="8">

                        {data.reduce((total, item, index)=>{

                            switch (path) {
                                case "":{
                                    total.push(<Switch data={item} key={item.notifi._id}></Switch>)
                                    break;
                                }
                                case "reactions":{
                                    if (item.notifi.type === typeNotification.heartPost){
                                        total.push(<Switch data={item} key={item.notifi._id}></Switch>)
                                    }
                                    break;
                                }
                                case "posts":{
                                    if (item.notifi.type === typeNotification.newPost){
                                        total.push(<Switch data={item} key={item.notifi._id}></Switch>)
                                    }
                                    break;
                                }
                                case "comments":{
                                    if (item.notifi.type === typeNotification.commentPost){
                                        total.push(<Switch data={item} key={item.notifi._id}></Switch>)
                                    }
                                    break;
                                }
                                default:
                                    break;
                            }
                            return total;
                        }, [])}
                    </Col>
                </Row>
            </Container>
            </div>
        </LoadingError>
        
    )
}

export default NotificationPage;