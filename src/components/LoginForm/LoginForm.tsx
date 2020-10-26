import React ,{ useState,useEffect, FormEvent } from 'react';
import {  useHistory } from "react-router-dom";
interface ITask{
    task: string;
    date: string;
    id: number;
}

interface ITasks {
    tasks: Array<ITask>;
}

interface IUserInfo {
    username: string;
    password: string | number;
    todolists: Array<ITask>;
}

interface IData{
    data:Array<IUserInfo>;
}
export const  LoginForm:React.FC<IData> = (props:IData) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    useEffect(() => {
        let storage = localStorage.getItem('crediential');
        if(storage){
            let storageDetails = JSON.parse(storage);
            var {user,passw} = storageDetails;
            setUsername(user)
            setPassword(passw)
        }
    }, [])
    // const onchageusername = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     let target:HTMLInputElement = event.target;
    //     setUsername(target.value)
    // }
    const loginFun = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log(username,password);
        let storage = localStorage.getItem('crediential');
        let storageDetails = JSON.parse(storage || '{}'); 
        if(storageDetails.username !== username ){
            const responseFromService = {
                user: username,
                passw: password
            };
            localStorage.setItem('crediential', JSON.stringify(responseFromService));
        }
        // console.log(props.data)
        for(let keys of Object.keys(props.data)){
            let value = props.data[Number(keys)];
            if(username === value.username && password === (value.password).toString()){
                // console.log(username)
                history.push("/home");
            }
        }
    }
    return (
        <section className={"container"}>
            <div className={"formfields"}>  
                <form onSubmit={loginFun} id="login-form">
                    <label>UserName
                        <input type="text" name="username"  value={username} id="#username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username"/> <br/>
                    </label>
                    <label >Password 
                            <input type="password" name="password"  value={password} id="#password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" /><br/>
                    </label> 
                    {/* <input type="submit" value="Login" /> */}
                    {/* <Link to="/home"> */}
                        <input type="submit" value="Login" />
                    {/* </Link> */}
                </form>
            </div>
        </section>
    )
}
