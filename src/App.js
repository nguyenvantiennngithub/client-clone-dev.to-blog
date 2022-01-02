import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {loginUser$} from './redux/selectors/'
import {verifyToken} from './redux/actions/'
import * as api from './api/'
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";  
import { useEffect } from "react";
import PostDetail from "./pages/PostDetail";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import LoadingError from "./components/LoadingError";
import SettingPage from "./pages/SettingPage";

function App() {  
  const dispatch = useDispatch();
  const {token, isError, isVerify, isLoading, user} = useSelector(loginUser$);
  
  //Middleware check if user dont logged 
  //will redirect to login
  const CheckLogin = function ({children}){
    return (
      <LoadingError data={{isLoading, isLoaded: isVerify, isError: isError}}>
        { (!token) ? <LoginPage/> : children }
      </LoadingError>
    )
  }

  // Middleware check if user is logged
  // User cant access this page (login, register)
  const CheckIsAlreadyLogin = function ({children}){
    if (token && isVerify){
      return <Navigate to="/"/>;
    }
    return children;
  }

  function CheckUserIsPostAuthor({children}){
    const {slug} = useParams()
    if (user && user.posts.indexOf(slug) !== -1){
      return children
    }else{
      return <NotFound></NotFound>
    }
  }
  useEffect(()=>{
    async function callAPI(){
      try {
        const res = await api.verifyToken();
        console.log(res.data)
        dispatch(verifyToken(res.data)); 
      } catch (error) {
        console.log(error);
        dispatch(verifyToken({token: false, user: null})); 
        
        <Navigate to="/"></Navigate>
      }
    }
    callAPI();
    
  }, [dispatch])

  return (
    <div className="App">
        <BrowserRouter>
          <>
            <Header/>
            <Routes>
              
              <Route path="/register" exact element={<CheckIsAlreadyLogin> <RegisterPage/> </CheckIsAlreadyLogin>} />
              <Route path="/login" exact element={<CheckIsAlreadyLogin> <LoginPage/> </CheckIsAlreadyLogin>} />
              

              <Route path="/settings/*" exact element={<CheckLogin> <SettingPage/> </CheckLogin>} />
              <Route path="/dashboard/*" exact element={<CheckLogin> <DashboardPage/> </CheckLogin>} />
              <Route path="/create-post" exact element={<CheckLogin> <CreatePostPage/> </CheckLogin>} />
              <Route path="/post/:slug" exact element={<PostDetail/>} />
              <Route path="/post/:slug/edit" exact element={<CheckLogin> <CheckUserIsPostAuthor> <EditPostPage/></CheckUserIsPostAuthor> </CheckLogin> }/>
              
              <Route path="/user/:username" exact element={<ProfilePage/>}/>

              <Route path="/" exact element={<CheckLogin> <HomePage/> </CheckLogin>}/>
              <Route path="*" exact element={<NotFound/>}/>
            </Routes>
            <Footer/>
          </>
        </BrowserRouter>
    </div>
  );
}

export default App;
