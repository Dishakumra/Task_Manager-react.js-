import React from 'react';

import '../App.css';
import {Router,Link} from 'react-router';
import {Route,Switch} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Details from './Details'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={ apiResponse:"" ,email:"",pass:"",Cpass : ""};
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleCpass = this.handleCpass.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.setredirect=this.setredirect.bind(this);

  }
   setredirect(event)
   {
        //let  history = useHistory();
        console.log("jkk");
         console.log(this.props.id);

   }

  handleSubmit(event)
  {

    //console.log("pressseded")

    if(this.state.pass != this.state.Cpass)
    {
      alert("Passwords didnt matched")
    }
    else {

      console.log(this.state.email);
      event.preventDefault()
      fetch("http://localhost:9000/signup",{
        method : 'POST',
        body: JSON.stringify({
        Email:this.state.email,
        Password:this.state.pass
       }),
         headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(res=>{
          {
            console.log(res);
            if(res.status!=400)
            {


               this.props.history.push(`/Details/${res}`);

          }

        }
          this.setState({apiResponse:res})})


        .catch(err =>err);

    }

  }
  registerPassport(event)
  {
    event.preventDefault()
    fetch("http://localhost:9000/auth/google/callback",{
      method : 'POST',

     })
      .then(res => {  console.log(res.text())})
      .then(res=>this.setState({apiResponse:res}))
      .catch(err =>err);
  }
  handlePass(event)
  {
    this.setState({pass:event.target.value});
  }
  handleEmail(event)
  {
     this.setState({email:event.target.value});
  }
  handleCpass(event)
  {
    this.setState({Cpass:event.target.value});
  }
  componentDidMount(){
    //this.callAPI();
  }
  render(){
    return(
      <div className="App">
      <header className="App-header">

         <h1 className="App-title">Signup to this site</h1>
         <form onSubmit={this.handleSubmit}>
         <input type="text" placeholder="Email" id="name" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.handleEmail} name="username"/>
         <br/>
         <input type="password" placeholder="password" id="pass" name="password"  pattern=".{6,}" onChange={this.handlePass}/>
         <br/>
         <input type="password"  id="cpass" name="cpassword" onChange={this.handleCpass}/>
         <br/>
         <button>Signup</button>
         <br/>
         <br/>
         <br/>
         </form>
         <form onSubmit={this.registerPassport}>

         </form>
         <br/>
         <Switch>
         <Route path="/Detail/:id" component={Details}/>
         </Switch>
         <div>{this.state.apiResponse}</div>
      </header>

      </div>
    )
}
}

export default App;
