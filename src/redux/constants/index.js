const INIT_STATE = {
    registerUser:{
        isLoading: false,
        message: '',
        
    },
    loginUser:{
        token: undefined,
        isVerify: false,
        isLoading: false,
        user: undefined,
        isError: false,
    },
    createPost:{
        isLoading: false,
        isError: false,
    },
    editPost:{
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: {author: {}, post: {}}
    },
    getPost:{
        data: {
            author: {},
            post: {},
        },
        isLoading: false,
        isLoaded: false,
        isError: false,
    },
    getPosts:{
        data: [],
        isLoading: false,
        isLoaded: false, 
        isError: false,
    }
    
}


export default INIT_STATE;