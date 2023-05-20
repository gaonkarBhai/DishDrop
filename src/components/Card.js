// import React, { useState } from "react";
// import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  let options = props.options;
  return (
    <>
      <div className="">
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "390px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="Product" style={{height:"120px",objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
       
            <div className="container w-100">
              <select className=" m-2 rounded h-100" >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 rounded h-100" >
              {
                Object.keys(options).map((curEle)=>{
                return <option key={curEle} value={curEle}>{curEle}</option>
                })
              }
              </select>
              <div className="d-inline h-100 fs-5">₹{options.half}/-</div>
            </div>
            <hr />
            <button className="btn btn-success justify-content-center ms-2" >Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
