const INIT_STATE = {
    registerUser:{
        isLoading: false,
        message: '',
        
    },
    loginUser:{
        token: undefined,
        isVerify: false,
        isLoading: false,
        user: {},
        isError: false,
        message: '',
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
            post: {content: {}},
            comment: [],
        },
        isLoading: false,
        isLoaded: false,
        isError: false,
    },
    getPersonalPosts:{
        posts: [],
        followers: [],
        following: [],
        isLoading: false,
        isLoaded: false,
        isError: false,
    },
    getPosts:{
        data: [],
        isLoading: false,
        isLoaded: false, 
        isError: false,
    },
    profile:{
        isLoading: false,
        isError: false,
        isLoaded: false,
        author: {},
        posts: [],
    }
}

const typeUpdateReaction = {
    post: 'post',//for postDetail
    posts: 'posts',//for homePage
    personalPosts: 'personalPosts'//for userPage
}

const typeUpdateFollow = {
    post: 'follow post',
    profile: 'follow profile'
}

export {typeUpdateReaction, typeUpdateFollow}


export default INIT_STATE;