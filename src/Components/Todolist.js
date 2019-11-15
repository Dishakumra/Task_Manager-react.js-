import React from 'react';

import '../App.css';
import {Router,Link} from 'react-router';
import {Route,Switch} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
class App extends React.Component{
  constructor(){
    super();
    this.state={imgurl:"",posts:[]};
    this.fetchdata=this.fetchdata.bind(this);
    this.addtotodo=this.addtotodo.bind(this);
  }
  addtotodo(){
    let l=this.props.history.location.pathname.split('/')

      this.props.history.push(`/addnewtodo/${l[2]}`)

  }
  removedata(){
    let l=this.props.history.location.pathname.split('/')
  axios.post(`http://localhost:9000/removedata/${l[`${l.length-1}`]}`)
  //.then(res=>res.json())
  .then(res=>{
  console.log(res);
  })
  .catch((err) => {
    console.log(err);

  });
  }
  fetchdata(){
      let l=this.props.history.location.pathname.split('/')
    axios.post(`http://localhost:9000/gettodolist/${l[`${l.length-1}`]}`)
    //.then(res=>res.json())
    .then(posts=>{
      console.log(posts.data)
       //var d=JSON.parse(posts);
       this.setState({posts:posts.data})


    })
    .catch((err)=>{
      console.log(err)
    })
  }
  deleterow(id){
    var p=this.props.history.location.pathname.split('/')
    axios.post(`http://localhost:9000/changeStatus/${p[`${p.length-1}`]}`,{
      id:id
    })
    .then(res=>{
    console.log(res);
    })
    .catch((err) => {
      console.log(err);

    });

  }

componentDidMount()
{
  let l=this.props.history.location.pathname.split('/')
  axios.post(`http://localhost:9000/getpic/${l[`${l.length-1}`]}`)

 .then((data)=>{
   //var d=JSON.parse(res)
   console.log(data.data.imageData);
   this.setState({imgurl:`${data.data.imageData}`})
 })
 .catch((err) => {
   console.log(err);

 });
 this.removedata();
  this.fetchdata();
}
render(){
  const columns=[
    {
      Header:" id",
      accessor:"_id",
      headerStyle: { whiteSpace: 'unset' },
    style: { whiteSpace: 'unset' },
    filterable:false

  },

    {
      Header:"Task Name",
      accessor:"TaskName",
      headerStyle: { whiteSpace: 'unset' },
    style: { whiteSpace: 'unset' },
    filterable:true

    },
    {
      Header:"Creat Date",
      accessor:"CreateDate",
      headerStyle: { whiteSpace: 'unset' },
    style: { whiteSpace: 'unset' },

    },
    {
      Header:"Last Date",
      accessor:"LastDate",
      headerStyle: { whiteSpace: 'unset' },
    style: { whiteSpace: 'unset' },
    maxWidth: 300,
      filterable:true
    },
    {
      Header:"Status",
      accessor:"Status",
      headerStyle: { whiteSpace: 'unset' },
    style: { whiteSpace: 'unset' },
    maxWidth: 600,
      filterable:true
    },
    {
      Header:"Priority",
      accessor:"Priority",
      headerStyle: { whiteSpace: 'unset' },
    style: { whiteSpace: 'unset' },
    maxWidth: 500,
      filterable:true
  },
  {
    Header:"Action",
    Cell:props=>{
      return(
        <button className="App"
        onClick={
          ()=>{
            //console.log(props);
             this.deleterow(props.original._id);
          }
        }>Done</button>
      )
    },
    filterable:false,
    sortable:false
  }

  ]
  return(
    <div className="App">
    <img src={'../../../api/'+this.state.imgurl} alt="sry" height="80" width="80"/>

    <ReactTable columns={columns}
         data={this.state.posts}
    defaultPageSize = {5}
      pageSizeOptions = {[5,6, 8]}


  >

    </ReactTable>
    <br/>
    <button onClick={this.addtotodo}>Add Task</button>
    </div>
  )
}
}
export default App;
