import React from 'react';

import '../App.css';
import {Router,Link} from 'react-router'
import axios from 'axios';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={ apiResponse:"" ,email:"",pass:""};
    this.handleSubmit=this.handleSubmit.bind(this);
    //this.callAPI=this.callAPI.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.hadleChange = this.hadleChange.bind(this);


  }

  handleSubmit(event)
  {
    console.log(this.state.email);
    event.preventDefault()
   // fetch("http://localhost:9000/login",{
   //   method : 'POST',
   //    body: JSON.stringify({
   //   Email:this.state.email,
   //   Password:this.state.pass
   // }),
   //   headers: {"Content-Type": "application/json"}
   //  })
   //  .then(res => res.json())
   //  .then(res=>{
   //      console.log(res);
   //      if(res.status!=400)
   //         this.props.history.push(`/todolist/${res}`);
   //
   //    })
   //
   //  .catch(err =>err);
   axios.post(`http://localhost:9000/login`,{
     Email:this.state.email,
    Password:this.state.pass
   })
  // .then(res => res.json())
   .then(res=>{
     console.log(res.data);
      this.props.history.push(`/todolist/${res.data}`);
   })
   .catch((err) => {
     console.log(err);

   });

  }
  hadleChange(event)
  {
    this.setState({email:event.target.value});
  }
  handleChange(event)
  {
    this.setState({pass:event.target.value});
  }
  componentDidMount(){
  }
  render(){
    return(
      <div className="App">
      <header className="App-header">

         <h1 className="App-title">Login to your account</h1>
         <form onSubmit={this.handleSubmit}>
         <input type="text" placeholder="Email"pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={this.hadleChange}/>
         <br/>
         <input type="password" placeholder="password"  onChange={this.handleChange}/>
         <br/>
         <button>Submit</button>
         </form>
         <br/>

      </header>
      <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}

export default App;
