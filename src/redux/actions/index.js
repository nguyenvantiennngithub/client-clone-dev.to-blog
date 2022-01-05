const getType = (reduxAction) =>{
    return reduxAction().type;
}


export * from './auth'
export * from './personal'
export * from './post'
export * from './posts'
export * from './profile'
export * from './comment'
export {getType}