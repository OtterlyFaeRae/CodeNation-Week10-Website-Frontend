import { useState } from 'react';
import { getAllUsers, update, deleteUser } from '../utils/index'

const Account = ({user, setUser}) => {
    const [option, setOption] = useState('')
    const [uNameList, setUNameList] = useState('')
    const submitHandler = async () => {
        setUNameList(await getAllUsers())
        setOption('get all')
    }
    return (
        <div>
            {user ? 
            <>
                <button onClick={() => submitHandler()}>Get all users</button>
                <button onClick={() => setOption('update')}>Update your email</button>
                <button onClick={() => setOption('delete')}>Delete your account</button>
            </>
            : 
            <p>Please Log In.</p>
            }
            <AccountContent option={option} uNameList={uNameList} setUser={setUser} token = {user.token}/>
        </div>
    )
}

const AccountContent = ({option, uNameList, token, setUser}) => {
    switch(option) {
        case 'get all':
            return <GetAll uNameList={uNameList}/>
        case 'update':
            return <Update token={token}/>
        case 'delete':
            return <Delete token={token} setUser={setUser}/>
    }
}

const GetAll = ({uNameList}) => {
    return (
        <div>
            {uNameList.AllUsers.map(user => <h3 key={new Date().getTime()*Math.random()}>{user.uName}: {user.email}</h3>)}
        </div>
    )
}

const Update = ({token}) => {
    const [newEmail, setNewEmail] = useState('')
    const [updated, setUpdated] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault();
        await update(token, newEmail);
        setUpdated(true)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    New Email:
                    <input type='text' value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
                </label>
                <input type='submit'/>
            </form>
            <p>{updated ? "Update Successful!" : ""}</p>
        </div>
        
    )
}

const Delete = ({token, setUser}) => {
    const [uName, setUName] = useState('')
    const [pass, setPass] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [deleteFail, setDeleteFail] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await deleteUser(uName, token, pass);
        if(response.deleteSuccess){
            setDeleted(true)
            setUser('')
        } else {
            setDeleteFail(true)
        }
        setPass('')
        setUName('')
    }
    return (
        <div>
            {deleted ? 
            <p>Your account has been deleted successfully.</p> : 
            <form onSubmit={submitHandler}>
                <label>
                    Username:
                    <input type='text' value={uName} onChange={e=>setUName(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type='text' value={pass} onChange={e=>setPass(e.target.value)}/>
                </label>
                <input type='submit'/>
            </form>
            }
            {deleteFail ? <p>Incorrect credentials.</p> : <p></p>}
        </div>
    )
}



export default Account