import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../../Components/Niv';
import "./Category.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {useSnackbar} from 'notistack';


const Category = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [category, setCategory] = useState([]);
  const [name, setname] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getproduct() {
      axios.get("http://localhost:3000/api/Category/get").then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      });
    }
    getproduct();
  }, []);

  function deleteRow(Category_id){
    const dlte = "http://localhost:3000/api/Category/delete/" + Category_id ;
    axios
      .delete(dlte)
      .then(() => {
        enqueueSnackbar("Category deleted successfully",{variant:'success'});
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        enqueueSnackbar("Error deleteing category",{variant:'error'});
    });
  };

  async function editrow(index ,id){
    var x = document.getElementsByClassName("edit")[index].innerHTML
    if (x == "Edit") {
      document.getElementsByClassName("row")[index].disabled=false
      document.getElementsByClassName("edit")[index].innerHTML="save"
    }
    else{
      const newName = document.getElementsByClassName("row")[index].value;
      const new_cat = { name: newName};
    await axios
      .put(`http://localhost:3000/api/Category/update/${id}`, new_cat)
      .then(() => {
        enqueueSnackbar("Category updated successfully",{variant:'success'});
        window.location.reload()
      })
      .catch((error)=>{
        console.error("Error updating category", error);
        enqueueSnackbar("Error updating category",{variant:'error'});
      })
    }
  };
    return (
        <div>
        <Niv name='Category'/>
        <div className="data">
         <h1 className='title'></h1>
        <div class="tbl-header">
        <input type="text" style={{ height: "40px", borderColor:"rgba(53, 39, 68, 1)",margin:"20px" }} placeholder=" Search Categories..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />

          <Link to="/Category/AddCategory">
            <button class="add_pdct">+ New Category</button>
          </Link>
          
          <table className="menu-tbl" cellpadding="0" cellspacing="0" border="0">
            <thead>
                <tr>
                <th className='menu-th'>Category Id</th>
                <th className='menu-th'>Category Name</th>
                <th className='menu-th'>Action</th>
                </tr>
            </thead>

            <tbody>
              {category.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.Category_name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((category,index) => (
              <tr>
              <td>{category.Category_id}</td>
              <td>
                { <input type="text" className="row" placeholder={category.Category_name} disabled 
                          onChange={(event) => {setname(event.target.value);} }/>
                }
            </td>
              <td>
                <button className='edit' onClick={()=> editrow(index,category.Category_id)} type='submit'>Edit</button>
                <button className='del' onClick={(e)=> deleteRow(category.Category_id)}>Delete</button>
              </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  </div>
    );
};

export default Category;