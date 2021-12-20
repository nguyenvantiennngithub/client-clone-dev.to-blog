import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {loginUser$} from './redux/selectors/'
import {verifyToken} from './redux/actions/'
import * as api from './api/'
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";  
import CreatePost from './pages/CreatePost'
import { useEffect } from "react";
import PostDetail from "./pages/PostDetail";


function App() {  
  const dispatch = useDispatch();
  
  //Middleware check if user dont logged 
  //will redirect to login
  const CheckLogin = function ({children}){
    const {token} = useSelector(loginUser$);
    if (token === false){
      return <Navigate to="/login" />;
    }
    return children;
  }

  // Middleware check if user is logged
  // User cant access this page (login, register)
  const CheckIsAlreadyLogin = function ({children}){
    const {token} = useSelector(loginUser$);
    if (token){
      return <Navigate to="/"/>;
    }
    return children;
  }
  useEffect(()=>{
    async function callAPI(){
      const res = await api.verifyToken();
      console.log(res.data)
      dispatch(verifyToken(res.data)); 
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
              
              <Route path="/create-post" exact element={<CheckLogin> <CreatePost/> </CheckLogin>} />
              <Route path="/post/:slug" exact element={<CheckLogin> <PostDetail/> </CheckLogin>} />
              <Route path="/" exact element={<CheckLogin> <HomePage/> </CheckLogin> }/>
            </Routes>
            <Footer/>
          </>
        </BrowserRouter>
    </div>
  );
}

export default App;
