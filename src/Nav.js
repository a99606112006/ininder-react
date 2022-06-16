import React from "react";
import {Link} from 'react-router-dom';


const Nav = (props)=>{
  let menu;

  const logout = async() =>{
    await fetch ('http://localhost:8000/api/logout',{
      method: 'POST',
      header: {
        'Accept': "application/json",
         'Content-Type': "application/json"
      },
      credentials: 'include'

  });
  props.setName ('');
  }



  if(props.name ===''){
    menu = (
      <div className ="navbar-nav ms-auto"> 
              

      <Link to ="/login" className = "nav-link " > login</Link>


      <Link to ="/register" className = "nav-link " > register</Link>

  
      </div>
    ) 


  }else{
    menu = (
      <div className ="navbar-nav ms-auto"> 
      <Link to ="/login" className = "nav-link "onClick={logout} > logout</Link>
      <Link to ="/chat" state={{ from: props.name }} className = "nav-link " > chat</Link>
      <Link to ="/profile" state={{ from: props.name }} className = "nav-link " > profile</Link>

      </div>

    )


  }





    return(
      <nav className = "navbar navbar-expand">
        
          <Link to ="/" className = "navbar-brand" >home</Link>
          {menu}
            
        
      </nav>
    );
};

export default Nav;