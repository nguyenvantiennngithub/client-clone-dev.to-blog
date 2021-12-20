import axios from "axios";


function HomePage(){
    
    const handleOnclick = ()=>{
        const token = localStorage.getItem('token')
        if (!token){
            return
        }
        axios.get(`http://localhost:8080/`, { 'headers': { 'Authorization':  token}})
    }
    
    return (
        <>
            <h1>không nhìn thấy là ko ok</h1>
            <button type="button" onClick={handleOnclick}>Click me!!!</button>
        </>
    )
}

export default HomePage