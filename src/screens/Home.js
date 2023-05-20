import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";
import { useEffect, useState } from "react";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let responce = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responce = await responce.json();
    setFoodItem(responce[0]);
    setFoodCat(responce[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-caption" style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
        </div>
        </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300×300?burger" style={{filter:"brightness(30%)"}} className="d-block w-100" alt="" />
    </div>
    <div className="carousel-item" id='carousel'>
      <img src="https://source.unsplash.com/random/300×300?burger" style={{filter:"brightness(30%)"}} className="d-block w-100" alt="" />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300?burger" style={{filter:"brightness(30%)"}} className="d-block w-100" alt="" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

      <div className="container">
        {foodCat !== []
          ? foodCat.map((curEle, i) => {
              return (
                <div className="row mb-3">
                  <div key={i} className="fs-3 m-3">
                    {curEle.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem
                        .filter(
                          (item) => (item.CategoryName == curEle.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                        )
                        .map((filterItem, j) => {
                          return <div  key={j} className="col-12 col-md-6 col-lg-3">
                          <Card
                          foodItem={filterItem}
                          options = {filterItem.options[0]}/>
                          </div>;
                        })
                    : "no item"}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </>
  );
};

export default Home;
