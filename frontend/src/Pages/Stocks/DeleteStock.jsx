import React from "react";
import Niv from "../../Components/Niv";
import axios from "axios";
import "./DeleteStock.css";
import { useState } from "react";
import { toast ,ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const DeleteStock = () => {
  const [id,setid] = useState("");
  const [name,setname] = useState("");
  const [Quantity,setQuantity] = useState(0);
  const [cost,setcost] = useState(0);
  const [items, setItems] = useState([]);
  const [delete1] = useState([]);
  
    
  function Find(id){
    setid(id);
          function getItems() {
            const url="http://localhost:3000/api/Stock/find/"+id;

            axios.get(url)
              .then((res) => {
                setItems(res.data);
              })
              .catch((error) => {
                console.error("Error fetching stock data:", error);
              });
          }
          getItems();
  }

  function handlesubmit(index,id,qty,cost1){
    var checkBox = document.getElementsByClassName("myCheck")[index];

    if (checkBox.checked === true){
      delete1.push(id)
      setQuantity(Quantity+Number(qty))
      setcost(Number(cost+(cost1*qty)))
     

    } else if(checkBox.checked === false){
      const index = delete1.indexOf(id);
      delete1.splice(index, 1);
      setQuantity(Quantity-Number(qty))
      setcost(Number(cost-(cost1*qty)))
      
    }
    
  }
  function  deletedata(){
   for(var i=0;i<=delete1.length-1;i++){
     
      const delete2="http://localhost:3000/api/Stock/delete/" +delete1[i]
      axios
      .delete(delete2)
      .then(() => {
        toast.success("Stock deleted from inventory");
      })
      .catch((err) => {
        toast.error("Cannot delete data");
      });
  }

  const Inventoryfood = {Quantity,cost};
  const url="http://localhost:3000/api/Product/update1/"+id
    axios.post(url,Inventoryfood)
    .then(()=>{
    alert("Inventory updated");
    })
    .catch((err)=>{
    alert(err);
    })


  }
  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name="Stock/ Delete Stock" />
      <div className="data">
        <div className="carddel">
          <form action="#" className="Resdelform">
            <header className="delheader">Delete the records</header>
            <br />
            <div className="form first">
              <div class="delete details">
                <div class="fields">
                  <div class="input-field">
                    <label className="ResdelProductCode">Product Id</label>
                    <input type="text" placeholder="Product Id" value={id}
                    onChange={(e) => Find(e.target.value)}/>
                  </div>
                  <div class="input-field">
                    <label className="ResdelProductCode">Product Name</label>
                    <input type="text" placeholder="Product Name" value={name}
                    onChange={(e) => setname(e.target.value)}/>
                  </div>
                  <div class="input-field">
                    <label>Date</label>
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>
            <br/>
              

            <table className="ResDelDesc">
              <tr className="tbl-head">
                <td className="del-tbl-head">Time</td>
                <td className="del-tbl-head">Buy Date</td>
                <td className="del-tbl-head">Quantity</td>
                <td className="del-tbl-head">Unit Cost</td>
                <td className="del-tbl-head">Buy Cost</td>
                <td className="del-tbl-head"></td>
              </tr>
              {items.map((items, index) => (
              <tr key={index}>
             
                <td className="del-tbl-data">{items.time}</td>
                <td className="del-tbl-data">{items.date}</td>
                <td className="del-tbl-data">{items.Quantity}</td>
                <td className="del-tbl-data">{items.Unit_price}</td>
                <td className="del-tbl-data">{Number(items.Quantity*items.Unit_price)}</td>
                <td className="del-tbl-data">
                  <input type="checkbox" className="myCheck" onClick={()=>handlesubmit(index,items._id,items.Quantity,items.Unit_price)}/>
                </td>
              </tr>
              ))}
            </table>
            <button class="Add" onClick={()=>deletedata()}>
              <span class="addbtn">Delete</span>
            </button>
          </form>
            <a href="/Stocks">
            <button class="back">
              <span class="bckbtn">Go Back</span>
            </button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default DeleteStock;
