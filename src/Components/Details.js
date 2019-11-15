import React from 'react';

import '../App.css';
import {Router,Link} from 'react-router'
import DefaultImg from '../assets/default-img.jpg';
import axios from 'axios';
class App extends React.Component
{
  constructor(props){
    super(props)
    this.state={name:"",age:"",gender:"",multerImage:DefaultImg}
    this.handlename=this.handlename.bind(this);
    this.handleage=this.handleage.bind(this);
    this.handlegender=this.handlegender.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

  }
  setDefaultImage(uploadType) {

    this.setState({
      multerImage: DefaultImg
    });

}
  uploadImage(e, method) {
  let imageObj = {};

     e.preventDefault();

    let imageFormObj = new FormData();

    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", e.target.files[0]);

    // stores a readable instance of
    // the image being uploaded using multer
    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0])
    });
       var l=this.props.history.location.pathname.split('/')
       axios.post(`http://localhost:9000/uploadmulter/${l[`${l.length-1}`]}`, imageFormObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using multer");
          //this.setDefaultImage("multer");
        }
      })
      .catch((err) => {
        alert("Error while uploading image using multer");
        this.setDefaultImage("multer");
      });

}
  handlename(event)

  {
      this.setState({name:event.target.value});
  }
  handleage(event){
      this.setState({age:event.target.value});
  }
  handlegender(event)
  {
      this.setState({gender:event.target.value});
  }
  handleSubmit(event){
    if(this.state.name=="" ||this.state.age=="")
    {

      //console.log(u[2]);
      console.log(this.props.history.location.pathname)
      alert("fill all the details")
    }
    else {

      console.log(this.state.name);
      event.preventDefault()
      var u=this.props.history.location.pathname.split('/');

       //u=JSON.parse(u)
       console.log(u[2])
       var d=JSON.stringify(u[2]);
      fetch(`http://localhost:9000/filldetails/${u[`${u.length-1}`]}`,{
        method : 'POST',
        body: JSON.stringify({
        Name:this.state.name,
        Age:this.state.age,
        Gender:this.state.gender,
        selectedfile:this.state.selectedfile
       }),
         headers: {"Content-Type": "application/json"}
        })

        .then(res=>{
          // this.setState({apiResponse:res}
            console.log(res.text());
            var f=this.props.history.location.pathname.split('/');
            if(res.status==200)
            this.props.history.push(`/todolist/${f[2]}`)
          })


        .catch(err =>{
          console.log(err)
          console.log("jjj");
        });

    }
  }
  render(){
    return(
      <div className="App">
      <header className="App-header">
      <h1 className="App-title">Fill up the Details</h1>
      <form onSubmit={this.handleSubmit}>
      <label>Name</label>
      <br/>
      <input type="text" placeholder="name" id="name" onChange={this.handlename}  required/>
      <br/>
      <label>Age</label>
      <br/>
      <input type="text" placeholder="age" id="age" pattern="[0-9]" onChange={this.handleage} required/>

      <br/>
      <label>Gender </label>
      <br/>

      <select  onChange={this.handlegender} defaultValue={'none'}>

          <option value="none">None</option>
          <option value="male" >Male</option>



          <option value="female">Female</option>



          <option value="transgender">Transgender</option>


      </select>
      <br/>
      <label>Upload photo</label>


      <br/>
      <div >
      <div className="process">


        <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} required />
        <img src={this.state.multerImage} alt="upload-image" height="80" width="80" />
      </div>
      </div>
      <br/>

    <button type="submit">submit</button>
      </form>
      </header>
      </div>
    )
  }
}
export default App;
