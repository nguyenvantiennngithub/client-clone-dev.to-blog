import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import Follow from "../../../components/Follow";

function Followers(){
    
    const {followers} = useSelector(state => state.getPersonalPosts)
    return (
        <Container>
            <Row>
                {followers.map(item=>{
                    return <Follow key={item.username} data={item}></Follow>
                })}
            </Row>
        </Container>
    )
}

export default Followers;