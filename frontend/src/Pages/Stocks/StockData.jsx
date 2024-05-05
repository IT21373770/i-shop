import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Stocks.css";

const StockData = (props) => {
  
  const id=props.id;
  const [data, setdata] = useState([]);
  
  useEffect(() => {
    function getItems1() {
        const url="http://localhost:3000/api/Stock/find/"+id;
  
        axios.get(url).then((res) => {
          setdata(res.data);
        });
      }
      getItems1();
  },[])

return (
    <div>
      <table className="resData">
        <tr>
          <th>Date - Time</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Cost</th>
        </tr>
          {data.map((data, index) => (
            <tr>
              <td>{data.date} - {data.time}</td>
              <td>{data.Quantity}</td>
              <td>{data.Unit_price}</td>
              <td>{data.Quantity*data.Unit_price}</td>
            </tr>
          ))}
      </table>
    </div>
      
  );
};

export default StockData;