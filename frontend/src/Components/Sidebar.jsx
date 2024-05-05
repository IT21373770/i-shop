import React, { useState } from 'react';
import { FaBars }from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FcShop } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcSurvey } from "react-icons/fc";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
   
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FcBullish/>
        },
        {
            path:"/Category ",
            name:"Categories",
            icon:<FcShop/>
        },
        {
            path:"/Stocks ",
            name:"Stock Items",
            icon:<FcInTransit/>
        },
        {
            // path:"/Category ",
            name:"Reports",
            icon:<FcSurvey/>
        }
        
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">i-Shop</h1>
                   <div style={{marginLeft: isOpen ? "35px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           
           <main> 
                {children}
            </main>
           
        </div>
    );
};

export default Sidebar;