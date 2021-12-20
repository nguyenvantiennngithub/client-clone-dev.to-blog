const INIT_STATE = {
    registerUser:{
        isLoading: false,
        message: '',
    },
    loginUser:{
        token: undefined,
        username: undefined,
        isLoading: false,
        user: undefined,
    },
    createPost:{
        isLoading: false,
    },
    getPost:{
        data: {
            author: {},
            post: {},
        },
        isLoading: false,
        isLoaded: false,
    }
    
}


export default INIT_STATE;