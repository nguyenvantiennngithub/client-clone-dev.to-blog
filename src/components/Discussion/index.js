
import { Button } from 'reactstrap';
import Comment from './Comment';
import ContainerComment from './ContainerComment';
import {useSelector} from 'react-redux'
import './Discussion.scss'

function Discussion(){

    const {data} = useSelector(state => state.getPost);
    const {comment} = data;
    return (
        <div className='discussion'>
            <div className='discussion__header'>
                <h4>Discussion</h4>
                <Button color='primary'>Subcribe</Button>
            </div>
            <Comment></Comment>
            {
                comment.map((item, index) =>{
                    return <ContainerComment key={index} data={{...item}}></ContainerComment>
                })
            }
        </div>
    )
}

export default Discussion;