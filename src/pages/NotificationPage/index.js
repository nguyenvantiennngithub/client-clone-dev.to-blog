import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import {useSelector} from 'react-redux'
import './NotificationPage.scss'
import '../DashboardPage/Dashboard.scss'
import LoadingError from "../../components/LoadingError"
import Switch from './Switch';

function NotificationPage(){
    const params = useParams()
    const path = params['*'];
    const {isLoading, isLoaded, isError, data} = useSelector(state => state.notification)
    console.log({isLoading, isLoaded, isError, data})
    return (
        <LoadingError data={{isLoading, isLoaded, isError}}>
            <div className='dashboard'>
                <Container>
                <Row>
                    <Col xl="3">
                        <h2 className="dashboard-title">Dashboard</h2>
                        <div className="dashboard__list">
                            <Link to="/dashboard" className="dashboard__list-item-link">
                                <div className={(path==='') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                    <span className="dashboard__list-item-text">All</span>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xl="8">

                        {data.map((item, index)=>{
                            return <Switch data={item} key={index}></Switch>
                        })}
                    </Col>
                </Row>
            </Container>
            </div>
        </LoadingError>
        
    )
}

export default NotificationPage;