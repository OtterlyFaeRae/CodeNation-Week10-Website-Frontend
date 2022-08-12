import { login } from '../utils';
import { useState } from 'react';

const Login = ({user, setUser}) => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [failedAttempt, setFailedAttempt] = useState(false)
    try {
        const submitHandler = async (e) => {
            e.preventDefault();
            const data = await login(username, password);
            if(data.token){
                setUser({
                    uName: data.uName,
                    token: data.token})
            } else {
                setFailedAttempt(true)
            }
            setUsername('')
            setPassword('')
        }
        return (
            <div>
                {
                    user ? 
                    <h3>Welcome back, {user.uName}!</h3>
                    : 
                    <form onSubmit={submitHandler}>
                        <label>
                            Username
                            <input type='text' value={username} onChange={e => setUsername(e.target.value)}/>
                        </label>
                        <label>
                            Password
                            <input type='text' value={password} onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <input type='submit'/>
                        {failedAttempt ? 
                        <p>Incorrect Credentials.</p> : 
                        <></>}
                    </form>
                }
                
            </div>
        )
    } catch (error) {
        console.log(error)
    }
    
}

export default Login