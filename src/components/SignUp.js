import {useState} from 'react';
import {login, signUp} from '../utils';


const SignUp = ({user, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault();
        await signUp(username, password, email);
        const data = await login(username, password)
        setUser({
            uName: data.uName,
            token: data.token})
        setUsername('')
        setPassword('')
        setEmail('')
    }
    return (
        <div>
            {
            user ? 
            <p>Welcome aboard!</p>
            :
            <form onSubmit={submitHandler}>
            <label>
                Username:
                <input type='text' value ={username} onChange={e=>setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type='text' value={password} onChange={e=>setPassword(e.target.value)}/>
            </label>
            <label>
                Email:
                <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>
            </label>
            <input type='submit'/>
        </form>
            }
            
        </div>
    )
}

export default SignUp;