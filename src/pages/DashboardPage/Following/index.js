import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import Follow from '../../../components/Follow'

function Following(){
    const {following} = useSelector(state => state.getPersonalPosts)
    return (
        <Container>
            <Row>
                {following.map(item=>{
                    return <Follow key={item.username} data={item}></Follow>
                })}
            </Row>
        </Container>
    )
}

export default Following