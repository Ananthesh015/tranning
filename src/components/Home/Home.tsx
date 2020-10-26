import React,{ useState, useRef  } from 'react';
import { Link, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";


interface ITask{
    id: number;
    task: string;
    date: string;
}

interface ITasks {
    tasks: Array<ITask>;
}

interface IUserInfo {
    username: string;
    password: string | number;
    todolists: (ITask)[];
}

interface IData{
    data:Array<IUserInfo>;
    updateData:(NewTask: IUserInfo) => void
}


export const  Home:React.FC<IData & RouteComponentProps> = (props) =>{
    const taskField = useRef<HTMLInputElement>(null) ;
    // eslint-disable-next-line
    const [data, setdata] = useState<any>(props.data);
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
            props.updateData && props.updateData({username,password,todolists})
        }
    }
    const handleLogout = () =>{
        history.push("/");
    }
    return (
            <section className="container">
                <div id="todo-lists" className="lists">
                <h1 id="display-name">{`Hello ${storageDetails.user}`}</h1>
                    {tasksList?.map((tasks:any,i:any) => (
                        <Link className={"lists"} to={`/home:${i}`}>
                            <div key={`${tasks.id}`} className={"list"} onDoubleClick={()=> handleclick(i)} >
                                { tasks.task +" "+ tasks.date}
                            </div>
                        </Link>
                    ))}<br/>
                     <input type="text" name="task" ref={taskField}  placeholder="task"/> 
                     <input type="button" value="Submit" onClick={handleSubmit}/><br/>
                     <input type="button" value="Logout" onClick={handleLogout} />                     
                </div>
            </section>
    )
}
