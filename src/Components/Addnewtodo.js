import React from 'react';

import '../App.css';

import axios from 'axios';
class App extends React.Component
{
  constructor(){
    super()
    this.state={TaskName:"",Priority:"",LastDate:""}
    this.handlename=this.handlename.bind(this);
    this.handlepriority=this.handlepriority.bind(this);
    this.handledate=this.handledate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handlename(event){
    this.setState({TaskName:event.target.value})
  }
  handlepriority(event){
    this.setState({Priority:event.target.value})
  }
  handledate(event){
    this.setState({LastDate:event.target.value})
  }
  handleSubmit(){
    if(this.state.TaskName==""||this.state.Priority==""||this.state.LastDate=="")
    {
      alert("Fill all the details");
    }
    else{
      var p=this.props.history.location.pathname.split('/')
      axios.post(`http://localhost:9000/addtotodo/${p[`${p.length-1}`]}`,{
        TaskName:this.state.TaskName,
        Priority:this.state.Priority,
        LastDate:this.state.LastDate
      })
      .then(res=>{
      console.log(res);
      })
      .catch((err) => {
        console.log(err);

      });
    }
  }
  render(){
    return(
      <div className="App">
      <header className="App-header">
      <h1 className="App-title">Add Your Next Task</h1>
      <form onSubmit={this.handleSubmit}>
      <label>Task Name</label>
      <br/>
      <input type="text" placeholder="name" id="name" onChange={this.handlename} />
      <br/>
      <label>Priority</label>
      <br/>
      <input type="text" placeholder="priority" id="age" onChange={this.handlepriority} />

      <br/>
      <label>Last Date </label>
      <br/>
       <input type="date"  onChange={this.handledate}/>

      <br/>

      <br/>
        <button type="submit">submit</button>
      </form>
      </header>
      </div>
    )
  }
}
export default App;
