// import React, { Component } from 'react'
// interface ITask{
//     task: string;
//     date: string;
// }

// interface ITasks {
//     tasks: Array<ITask>;
// }

// interface IUserInfo {
//     username: string;
//     password: string | number;
//     todolists: ITasks;
// }

// interface IData{
//     data:Array<IUserInfo>;
// }
// export class Class extends Component<IData, any> {
//     // constructor(props:IData){
//     //     super(props)
//     // }
//     render() {
//         return (
//             <section className="container">
//                 <div id="todo-lists" className="lists">
//                     <h1 id="display-name">Hello All</h1>
//                     <ul id="lists"></ul>
//                     {/* {data} */}
//                     {this.props.data?.map((userinfo)=>(
//                         <div key={userinfo.username}>
//                             {userinfo.todolists.tasks.map((tasks)=>(
//                                 <div>
//                                     {tasks.task}
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         )
//     }
// }
import React,{useState} from 'react'
interface Iprops{
    name: string;
    updatename?:(name: string) => void;
    welcomeNote: string;
}
export const Class:React.FC<Iprops> = (props:Iprops) => {
    const [isEdit, setIsEdit] = useState<boolean>(true);
    const [name, setname] = useState<string>(props.name);
    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        event.preventDefault();
        setname(event.target.value);
    }
    const updateName = () =>{
        console.log(name)
        props.updatename && props.updatename(name)
        setIsEdit(true)
    }
    return (
        <div>
            {isEdit && <h3 onClick={() => setIsEdit(false)}>Name: {name}</h3>}
            {!isEdit && <div>
                <input type="text" value={name} onChange={handleNameChange} />
                <button type="button" onClick={() => updateName()}>Update</button>
            </div>}  
            {props.welcomeNote}         
        </div>
    )
}


