import React from "react";
import Niv from "../../Components/Niv";
import "./AddStock.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const AddStock = () => {
  const [id , setid] = useState("");
  const [name , setname] = useState("");
  const [unit ,setunit ] = useState("");
  const [quantity, setquantity] = useState();
  const [unitPrice, setunitPrice] = useState();
  const [totalCost, settotalCost] = useState(0);
  const [supplier, setsupplier] = useState("");
  const [reorderlevel, setreorderlevel] = useState("");
  const [expiredate, setexpiredate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [Item_Id1,setItem_Id1]=useState("");
  const [Item_Name1,setItem_Name1]=useState("");
  const [Stock,setstock]=useState();
  const [Total,setTotal] = useState("");
  const [level,setlevel]=useState("");
  const [isEditing, setIsEditing] = useState(false);
  

  const navigate = useNavigate();


  const [Btlcode, setBtlCode_id] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/Product/proId").then((res) => {
      console.log(res.data);
      setBtlCode_id(res.data);

    });
  }, []);

  const id1 = Btlcode.map((item) => item.Product_Id);
  const Bid = Number(id1) + 1;

  const show = ()=>{

    if(!name){
      toast.error("Please enter the item name");
      return;
    }
    
    if(!unit){
      toast.error("Please enter unit type");
      return;
    }

    if(!quantity){
      toast.error("Please enter quantity");
      return;
    }
    
    if(!reorderlevel){
      toast.error("Please enter re-order level");
      return;
    }   

    if (isEditing===false){

      let id=Bid

      const Inventoryfood1 = {id,quantity,unitPrice,supplier,expiredate};
      axios.post("http://localhost:3000/api/Stock/add",Inventoryfood1)
      .then(()=>{
        settotalCost(quantity*unitPrice)
      })
      .catch((err)=>{
        alert(err);
      })


     const newres_add = {
       id,name,quantity,totalCost,reorderlevel,unit
     };
     axios.post("http://localhost:3000/api/Product/add",newres_add)
     .then(()=>{
      toast.success("Stock added to the inventory");
     })
     .catch((err)=>{
       alert(err);
     });
    }else{

      let id=Item_Id1
      const Inventoryfood1 = {id,quantity,unitPrice,supplier,expiredate};
      axios.post("http://localhost:3000/api/Product/add",Inventoryfood1)
      .then(()=>{

        toast.success("Stock added to the inventory");
      })
      .catch((err)=>{
        alert(err);
      })
  
      
    var qty=Number(quantity)+Number(Stock)
    var totalCost1=(Number(Total))+totalCost
      const Inventoryfood = {name,qty,totalCost1,reorderlevel,unit};
      const url="http://localhost:3000/api/Product/update/" + Item_Id1
    axios.put(url,Inventoryfood)
    .then(()=>{
      toast.success("Stock added to the inventory");
    })
    .catch((err)=>{
      alert(err);
    })
  }
}

const [items, setItems] = useState([]);
    useEffect(() => {
      function getItems() {
        axios.get("http://localhost:3000/api/Product/get").then((res) => {
          setItems(res.data);
        });
      }
      getItems();
    }, []);

  function findcode(name, id){
    
    console.log(id);
    setname(name);

    document.getElementById("Iname").style.visibility = "hidden";
    document.getElementById("Bname").value = name;

      items.map((items)=>{
        if(items.Product_Id.includes(id)===true){
          setItem_Id1(items.Product_Id);
          setItem_Name1(items.Product_name);
          setstock(items.Quantity);
          setlevel(items.Re_Order_Level);
          setreorderlevel(items.Re_Order_Level);
          setname(items.Product_name);
          setTotal(items.Total_Cost);
          setIsEditing(true);
        }
      })
    
  }

  function setSearch() {
    const inputElement = document.getElementById("Iname");
    if (inputElement) {
        inputElement.style.visibility =
        inputElement.style.visibility === "visible" ? "hidden" : "visible";
      const radioElement = document.getElementById("radio");
      if (radioElement) {
          radioElement.style.visibility =
          radioElement.style.visibility === "visible" ? "hidden" : "visible";
      }
    }
  }

  return (
    <div>
    <ToastContainer position="top-right" theme="colored" />
      <Niv name="Stock/ Add Stock" />
      <div className="data">
      <div className="cardAdd">
        <header>Add Stock</header>

  <div className="ResturantaddForm">
          <div className="form first">
            <div class="add detail">
              <div class="fields">

        <div class="input-field">
                    <label className="BaraddProductCode">Item Name</label>
                    
                    <input
                      id="Bname"
                      type="text"
                      placeholder="Item Name"
                      style={{ padding: "5px", minWidth: "92%" }}
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                        setname(event.target.value);
                      }}
                      pattern="[a-zA-Z]{1,30}"
                      title="Name can only contain A-Z characters"
                      onClick={() => {
                        setSearch();
                      }}
                    />

                    <div
                      style={{
                        maxHeight: "100px",
                        background: "#F4F0F0",
                        overflowY: "auto",
                        position: "absolute",
                        opacity: "0.85",
                        visibility: "hidden",
                        minWidth: "40%",
                        marginTop: "5%",
                      }}
                      id="Iname"
                    >
                    {items
                        .filter((val) => {
                          if (searchTerm === "") {
                            return val;
                          } else if (
                            val.Product_name.toLowerCase().includes(
                              searchTerm.toLowerCase()
                            )
                          ) {
                            document.getElementById("Iname").style.visibility =
                              "visible";
                            return val;
                          }
                        })
                        .map((item, index) => (
                          <p
                            className="fooddata"
                            key={index}
                            onClick={(e) =>
                              findcode(item.Product_name, item.Product_Id)
                            }
                          >
                            {item.Product_name}
                          </p>
                        ))}                      
                    </div>
                  </div>

                <div class="input-field">
                <div className="field2">
                  <label className="ResturantaddQuantity">Quantity</label><br/>
                  <input type="number" placeholder="Quantity" value={quantity}
                  onChange={(e) => setquantity(e.target.value)} min={1}
                  title="Value must be greater than or equal to 1"/>
                  <select name="unit" id="format" value={unit} onChange={(e) => setunit(e.target.value)}>
                    <option selected >Select Unit</option>
                    <option>Kg</option>
                    <option >g</option>
                    <option >L</option>
                    <option>ml</option>
                    <option>unit</option>
                  </select>
                </div> 
                </div>

                <div class="input-field">
                  <label className="ResturantaddBuyCost">Unit Price</label>
                  <input type="text" placeholder="Unit Price" value={unitPrice}
                  onChange={(e) => setunitPrice(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddBuyCost">Total Cost</label>
                  <input type="text" placeholder="Total Cost" value={(quantity*unitPrice)||0}
                  onMouseOver={(e)=>settotalCost(quantity*unitPrice)}
                  />
                </div>

                <div class="input-field">
                  <label className="ResturantaddSupplier">Supplier</label>
                  <input type="text" placeholder="Supplier" value={supplier}
                  onChange={(e) => setsupplier(e.target.value)} pattern="[a-zA-Z]{1,30}"
                  title="Contain A-Z charactors"/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddReOrderLevel">Re-order level</label>
                  <input type="number" placeholder="Re-order level" value={reorderlevel}
                  onChange={(e) => setreorderlevel(e.target.value)} min={1}
                  title="Value must be greater than or equal to 1"/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddExpireDate">Expire Date</label>
                  <input type="date" value={expiredate}
                  onChange={(e) => setexpiredate(e.target.value)}/>
                </div>
              </div>
              <button class="Resturantbtn" onClick={() => (show(),settotalCost(quantity*unitPrice))}>
                <span>{isEditing ? "Edit" : "Add "}</span>
              </button>
            </div>
          </div>
         </div>
          <a href="/Stocks">
          <button class="Resturantbtn">
            <span>Go Back</span>
          </button>
        </a>
      </div>
        <div className="card1">
          <table className="ResDelDesc">
            <tr className="tbl-head">
              <td className="del-tbl-head">Product Id</td>
              <td className="del-tbl-head">Product Name</td>
              <td className="del-tbl-head">Current Stock</td>
              <td className="del-tbl-head">Total Cost</td>
              <td className="del-tbl-head">Re-order level</td>
            </tr>
            <tr>
              <td className="del-tbl-data">{Item_Id1}</td>
              <td className="del-tbl-data">{Item_Name1}</td>
              <td className="del-tbl-data">{Stock}</td>
              <td className="del-tbl-data">{Total}</td>
              <td className="del-tbl-data">{level}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  );
};

export default AddStock;
