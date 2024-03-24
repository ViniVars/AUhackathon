"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { read } from "../../actions/server";

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        let username = sessionStorage.getItem("uname");

        const userProductsData = await read(`Login/${username}/Products`);

        let myall = userProductsData.split("@");
        const allProductsData = await read(`Products`);

        let allk = Object.keys(allProductsData);
        let allv = Object.values(allProductsData);

        let userProductsData1 = [];
        for (let i = 0; i < myall.length; i++) {
          let productName = `${username}_${myall[i]}`;
          let index = allk.indexOf(productName);
          if (index !== -1) {
            let productDetails = allv[index];
            productName = myall[i].split("_")[0];
            userProductsData1.push({ title: productName, ...productDetails });
          }
        }

        setUserProducts(userProductsData1);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };
    fetchUserProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-8">
        <h1 className="text-2xl font-bold mb-4">My Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
