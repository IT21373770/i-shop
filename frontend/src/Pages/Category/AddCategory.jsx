import React from "react";
import Niv from "../../Components/Niv";
import "./AddCategory.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {useSnackbar} from 'notistack';
import { Link } from "react-router-dom";

const AddCategory = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [id, setid] = useState("");
  const [name, setname] = useState("");

  const handleSubmit=(e)=>{

    if(!name){
      enqueueSnackbar("Please fill all the required fields",{variant:'error'});
      return
    }

    e.preventDefault();
    let id=Cat_Id
    const Category = {id,name};
    axios.post("http://localhost:3000/api/Category/add",Category)
      .then(()=>{
        enqueueSnackbar("Category added successfully",{variant:'success'});
      setid('')
      setname('')
    })
    .catch((err)=>{
      alert(err);
    })
  }

  const [CatId, setCategory_id] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/api/Category/CatId").then((res)=>{
      console.log(res.data)
      setCategory_id(res.data)
    });
  },[]);

  let Id = CatId.map((item) => item.Category_id);
  const Cat_Id = Number(Id)+1;

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name="Add Category"/>
      <div className="data">
      <div className="menuAdd">
        <header>Add Category</header>

        <form className="MenuaddForm" onSubmit={handleSubmit}>
        <div class="fields">
                <div class="input-field">
                  <label className="Cat_Id">Category Id</label>
                  <input type="text" placeholder="Category Id" disabled value={Cat_Id}
                  onChange={(e) => setid(e.target.value)} />
                </div>

                <div class="input-field">
                  <label className="Cat_Name">Category Name</label>
                  <input type="text" placeholder="Category Name" value={name}
                  onChange={(e) => setname(e.target.value)} pattern="[a-zA-Z]{1,10}"
                  title="Name can only contain A-Z characters"/>
                </div>
            </div>

              <button class="Menubtn" type="submit" >
                <span>Add</span>
              </button>
        </form>
        <Link to="/Category">
            <button class="Menubtn">Back</button>
        </Link>
      </div>
      </div>
    </div>

  );
};

export default AddCategory;
