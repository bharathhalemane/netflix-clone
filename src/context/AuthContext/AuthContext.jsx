import React from "react"

const AuthContext =React.createContext({
    username: "",
    password: "",
    login: () => { }
}) 

export default AuthContext