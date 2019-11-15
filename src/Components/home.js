import React from 'react';
import {Link} from 'react-router-dom';
export default function()
{
  return(
    <div className="App">
    <header className="App-header">
    <h1>Welcome to Your Task Manager</h1>
    <Link to='/login'><button>login</button></Link>
    <br />
    <Link to='/signup'><button>signup</button></Link>
    </header>

    </div>
  )
}
