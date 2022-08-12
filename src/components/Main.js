import Box from './Box'
import {useState} from 'react'

const Main = ({uName = 'Anonymous'}) => {
    const [picObj, setPicObj] = useState([])
    const [input, setInput] = useState('')
    const submitHandler = async (evt) => {
        evt.preventDefault();
        const newPicObj = [...picObj]
        const response = await fetch('https://picsum.photos/200/300')
        const pic = response.url
        newPicObj.push({
            username: uName,
            pic: pic, 
            comment: input
        });
        setInput('')
        setPicObj(newPicObj)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Comment:
                    <input type='text' id='comment' value={input} onChange={e => setInput(e.target.value)}></input>
                </label>
                <input type='submit' value='submit' />
            </form>
            {picObj.map((pic)=>{
                return <Box 
                    username={pic.username} 
                    img={pic.pic} 
                    comment={pic.comment} 
                    key={new Date().getTime()*Math.random()}
                />
            })}
        </div>
    )
}

export default Main;