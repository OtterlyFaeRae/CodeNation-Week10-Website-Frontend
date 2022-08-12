

exports.signUp = async (username, password, email) => {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'uName': username,
            'pass': password,
            'email': email
        })
    })
    const data = await response.json()
    return data;
};

exports.login = async (username, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'uName': username,
                'pass': password
            })
        })
        const data = await response.json()
        if(data.token) {
            return data;
        } else {
            throw new Error('Incorrect credentials')
        }
    } catch (error) {
        return error
    }
}

exports.getAllUsers = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (token, newEmail) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
            },
            body: JSON.stringify({
                'newEmail': newEmail
            })
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(`Error at Update: ${error}`)
    }
}

exports.deleteUser = async (uName, token, pass) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
            },
            body: JSON.stringify({
                'uName': uName,
                'pass': pass
            })
        })
        const data = response.json()
        return data
    } catch (error) {
        console.log(`Error at delete:${error}`)
    }
}