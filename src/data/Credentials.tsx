export interface ITask{
    task: string;
    date: string;
    id: number;
}

export interface ITasks {
    tasks: Array<ITask>;
}

export interface IUserInfo {
    username: string;
    password: string | number;
    todolists: Array<ITask>;
}

export interface IData{
    data:Array<IUserInfo>;
    updateData:(NewTask: IUserInfo) => void
}

export let credientialDetails = [
    {
        username:"Raj",
        password:123,
        todolists:[
                    {id:0,task: "Clean room",date: "15 October"},
                    {id:1,task: "Get Milk",date: "15 October"}
                ]
        
    },
    {
        username:"Govind",
        password:123,
        todolists:[
                    {id:0,task: "Clean room",date: "15 October"},
                    {id:1,task: "Get Milk",date: "15 October"}
                ]
    },
    {
        username:"Rajesh",
        password:123,
        todolists:[
                    {id:0,task: "Clean room",date: "15 October"},
                    {id:1,task: "Get Milk",date: "15 October"}
                ]
    }
]