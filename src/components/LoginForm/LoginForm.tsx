import React ,{ useState,useEffect, FormEvent, useContext } from 'react';
import {  useHistory } from "react-router-dom";
import{ Input, InputButton} from "../Styled";
import { credientialDetailsContext } from "../../App";

export const  LoginForm:React.FC = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setwarning] = useState(false);
    const CredentialsContext = useContext(credientialDetailsContext)
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
        for(let keys of Object.keys(CredentialsContext.data)){
            let value = CredentialsContext.data[Number(keys)];
            if(username === value.username && password === (value.password).toString()){
                // console.log(username)
                history.push("/home");
                break;
            }else{
                setwarning(true)
            }
        }
    }
    return (
        <section className={"container"}>
            <div className={"formfields"}>  
                <form onSubmit={loginFun} id="login-form">
                    <label>UserName
                        <Input type="text" name="username"  value={username} id="#username" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}} placeholder="Username"/> <br/>
                    </label>
                    <label >Password 
                        <Input type="password" name="password"  value={password} id="#password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}} placeholder="Password" /><br/>
                    </label> 
                    {/* <input type="submit" value="Login" /> */}
                    {/* <Link to="/home"> */}
                        <InputButton type="submit" value="Login" /> <br/>
                    {warning && <span style={{color:'red'}}>Enter the proper Name and Password</span>}
                    {/* </Link> */}
                </form>
            </div>
        </section>
    )
}
