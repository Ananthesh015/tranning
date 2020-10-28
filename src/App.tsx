import React, { useState,createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginForm , Home} from "./components";
import { credientialDetails, IUserInfo, IData } from "./data/Credentials";



export const credientialDetailsContext = createContext<IData>({data:[],updateData:()=>{}});
function App() {
  const [data, setdata] = useState(credientialDetails)
  // const [displayName, setDisplayName] = useState<string>("Ananthesh");
  // const [welcomeGreet, setwelcomeGreet] = useState<string>("");
  // const handlechange = (name:string) =>{
  //   setDisplayName(name);
  //   if(name){
  //     let greet = "Welcome " + name;
  //     setwelcomeGreet(greet)
  //   }else{
  //     let greet = "Please enter the name";
  //     setwelcomeGreet(greet)
  //   }
  // }
  const updateData = (list:IUserInfo) => {
    console.log("updatedata")
    let storage = localStorage.getItem('crediential');
    let storageDetails = JSON.parse(storage || '{}'); 
    console.log(storageDetails.user)
    const newData = data.filter((mydata,index)=>{return (Object.values(data).map((value) => value.username ).indexOf(mydata.username)) === index;})
    setdata(newData)
    console.log(data)
    
  }
  return (
    <div className="App">
      {/* <Class data={credientialDetails}/> */}
      {/* <Class name={displayName} updatename={handlechange} welcomeNote={ welcomeGreet } /> */}
      <Router>
        <Switch>
              {/* <Route default exact path="/"> <LoginForm data={data}/> </Route>
              <Route  path="/home" render={(props) => <Home {...props} data={data} updateData={updateData} />}/>
              <Route  path="/home:task" render={(props) => <Home {...props} data={data} updateData={updateData} />}/> */}

              {/* Below are the snap of by using the context */}
              <credientialDetailsContext.Provider value={{data,updateData}}>
                <Route default exact path="/"> <LoginForm  /> </Route>
                <Route  path="/home" render={(props) => <Home  />}/>
                <Route  path="/home:task" render={(props) => <Home />}/>
              </credientialDetailsContext.Provider >

        </Switch>
      </Router>
    </div>
  );
}

export default App;
