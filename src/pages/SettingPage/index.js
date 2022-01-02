import {Link, useParams, Routes, Route} from 'react-router-dom' 
import {Container, Row, Col} from 'reactstrap'
import Profile from './Profile' 
import Account from './Account' 
import { useSelector } from 'react-redux';
import LoadingError from '../../components/LoadingError';



import './SettingPage.scss'
import '../DashboardPage/Dashboard.scss'

function SettingPage(){

    const params = useParams()
    const path = params['*'];


    const {isLoading, isError, isVerify} = useSelector(state => state.loginUser)

    return (
        <LoadingError data={{isLoading, isError, isLoaded: isVerify}}>
            <div className="dashboard">
                <Container>
                    <h2 className="dashboard-title">Dashboard</h2>
                    <Row>
                        <Col xs="3">
                            <div className="dashboard__list">
                                <Link to="/settings" className="dashboard__list-item-link">
                                    <div className={(path==='') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                        <span className="dashboard__list-item-text">Profile</span>
                                    </div>
                                </Link>
                                
                                <Link to="/settings/account" className="dashboard__list-item-link">
                                    <div className={(path==='account') ? 'dashboard__list-item active' : 'dashboard__list-item'} >
                                        <span className="dashboard__list-item-text">Account</span>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col xs="9">
                            <Routes>
                                <Route path="/" exact element={<Profile />}></Route>
                                <Route path="/account" element={<Account />}></Route> 
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LoadingError>
    )
}

export default SettingPage;