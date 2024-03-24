"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { read } from "../../actions/server";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const productsData = await read('Products');
                const formattedProducts = Object.entries(productsData).map(([key, value], index) => {
                    const t = key.split('_');
                    return {
                        id: key,
                        title : t[1],
                        Desc: value.Desc,
                        Price: value.Price,
                        img: value.img,
                        By : t[0],
                        pall : `${key}_${value.Desc}_${value.Price}_${value.img}`
                    };
                });
                setProducts(formattedProducts);
                // console.log(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8 px-8">
                {/* Search bar */}
                <div className="flex justify-center">
                    <div className="w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
