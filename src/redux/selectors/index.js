const registerUser$ = (state) =>{
    return state.registerUser.message
} 
const loginUser$ = (state) =>{
    return state.loginUser
}


export {registerUser$, loginUser$}