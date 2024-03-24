import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from "../../Components/Niv.jsx";
import "./StockView.css";
import { BsArrowUpCircle } from "react-icons/bs"
import Resdata from "./Stocks.jsx";

const Stocks = () => {
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    function getItems() {
      axios.get("http://localhost:3000/api/Product/get").then((res) => {
          // console.log(res.data);
        setItems(res.data);
      });
    }
    getItems();
}, []);


function Finddata(index){
  document.getElementById(index).hidden=false
}

function close(id){
  document.getElementById(id).hidden=true
}

var count = 0;
for (var k in items) if (items.hasOwnProperty(k)) ++count;
const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Niv name="Stock Items" />
      <div className="data">
      <div style={{display:'flex', margin: '1em',borderStyle:"solid",borderLeftWidth:"5px",width:'25%',borderColor:" white white white #0077be",backgroundColor:"white",borderRadius:"9px"}}>
    <div style={{flexGrow: '1' ,paddingTop:"5px",paddingLeft:"5px",fontSize:'30px'}}>
    Stock Summary
    </div>     
    <div style={{flexGrow: '1',textAlign:'center' ,padding:'6px' ,borderLeft:"5px solid #dcdcdc"}}>
    <div style={{fontSize:'30px'}}> {count}</div>
    <div style={{fontSize:'10px'}}> Available Items In Stock</div>
    </div>  
      </div>
      <div>
      <input type="text" style={{ height: "40px", borderColor:"rgb(0,46,99)",margin:"20px" }} placeholder=" Search Items..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
      <a href="/Restaurant/RestaurantDelete">
        <button class="delete_btn">Delete the record</button>
      </a>
      <a href="/Restaurant/RestaurantAdd">
        <button class="add_new">+ Add New</button>
      </a>

    </div>
        <div class="table1">
          <div class="header_fixed" >
            <table className="stk-table"  >
              <thead className="stk-tbl-head">
                <tr>
                  <th className="stk-view-tbl">Product Id</th>
                  <th className="stk-view-tbl">Product Name</th>
                  <th className="stk-view-tbl">Current Stock</th>
                  <th className="stk-view-tbl">Total Cost</th>
                  <th className="stk-view-tbl">Re-order level</th>
                  <th className="stk-view-tbl">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.Product_name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((items, index) => (
                  
                  < >
                  <tr onClick={()=>Finddata(items.Product_Id)} key={index}>
                    <td>{items.Product_Id}</td>
                    <td>{items.Product_name}</td>
                    <td>{items.Quantity}{items.Unit}</td>
                    <td>{items.Total_cost}</td>
                    <td>{items.Re_order_level}</td  >
                   
                    <td>{items.Re_order_level<items.Quantity ? "good" : "bad "}</td>
                  
                  </tr>
                  <tr id={items.Item_Id} hidden>
                  <td colSpan={6}>
                  <Resdata id={items.Item_Id}/><br/>
                  <label onClick={()=>close(items.Item_Id)} ><BsArrowUpCircle fontSize={20}/></label>
                  </td>
                  </tr>
                  </> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Stocks;
