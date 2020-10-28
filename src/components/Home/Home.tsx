import React,{ useState, useRef, useContext  } from 'react';
import { Link, useHistory } from "react-router-dom";
// import { RouteComponentProps } from "react-router";
import{ Input, InputButton, Lists, List} from "../Styled"
import { credientialDetailsContext } from "../../App";
import { ITask, IUserInfo } from "../../data/Credentials";

export const  Home:React.FC = () =>{
    const taskField = useRef<HTMLInputElement>(null) ;
    const CredentialsContext = useContext(credientialDetailsContext)
    // console.log("CredentialsContext",CredentialsContext);
    // eslint-disable-next-line
    const [data, setdata] = useState<any>(CredentialsContext.data);
    // console.log("CredentialsContext",CredentialsContext);
    const [warning, setwarning] = useState(false)
    let history = useHistory();
    let storage = localStorage.getItem('crediential');
    let storageDetails = JSON.parse(storage || '{}'); 
    let {username,password,todolists} = (Object.values(data as IUserInfo).find(userinfo => userinfo.username === storageDetails.user ));
    let tasksList = todolists;
    // console.log(typeof tasksList)
    
    
    const handleclick = (id:any) => {
    console.log("id",id)
    tasksList?.splice(id,1);
    console.log(tasksList)
    }  


    const handleSubmit = () =>{
        // console.log(taskField.current?.value)
        if(taskField.current?.value !== ""){
            let newId = tasksList?.length;
            var date:Date = new Date();
            var displatDate:string = date.getDate() +" " + date.toLocaleString('default', { month:'long'})
            // let newTask = {task: taskField.current?.value as string, date: displatDate,id: (newId as number)+1 }
            tasksList?.push({task: taskField.current?.value as string, date: displatDate,id: (newId as number)++ })
            // console.log(tasksList)
            // console.log(tasksList?.length)
            // console.log((tasksList as Array<ITask>))
            let todolists = (tasksList as (ITask)[])
            // let NewTask = {username,password,newTaskList}
            CredentialsContext.updateData && CredentialsContext.updateData({username,password,todolists})
        }else{
            setwarning(true)
        }
    }
    const handleLogout = () =>{
        history.push("/");
    }
    return (
            <section className="container"> 
                <Lists>
                    <h1 id="display-name">{`Hello ${storageDetails.user}`}</h1>
                    {tasksList?.map((tasks:any,i:any) => (
                        <Link key={`${tasks.id}`} style={{textDecoration:"none",color:"black"}} to={`/home:${i}`}>
                            <List  onDoubleClick={()=> handleclick(i)} >
                                { tasks.task +" "+ tasks.date}
                            </List>
                        </Link>
                    ))}<br/>
                    <Input type="text" name="task" ref={taskField}  placeholder="task"/> 
                    <InputButton type="button" value="Submit" onClick={handleSubmit}/><br/>
                    {warning && <span style={{color:'red'}}>Enter the proper Task Name ()</span>} <br/>
                    <InputButton type="button" value="Logout" onClick={handleLogout} />                     
                </Lists>
            </section>
    )
}
