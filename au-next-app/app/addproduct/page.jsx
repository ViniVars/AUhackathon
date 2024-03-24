'use client'
import Swal from 'sweetalert2'
// import '@sweetalert2/themes/dark/dark.scss';
import Head from 'next/head';
import { v4 } from 'uuid';
import { addpro } from '../../actions/server';
export default function AddProduct() {

    async function addPro(){
        let pname = document.querySelector('.pname').value;
    let pdesc = document.querySelector('.pdesc').value;
    let pprice = document.querySelector('.pprice').value;
    let pimg = document.querySelector('.pimg').value;
    if(pname && pdesc && pprice && pimg){
        let username = sessionStorage.getItem('uname');
        console.log(username)
        addpro(username, v4(), {pname, pdesc, pprice, pimg})
        Swal.fire({
          title: "Good job!",
          text: "Prouct on sale",
          icon: "success"
        });
    }
    }
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <Head>
        <title>Add New Product</title>
      </Head>
      <div className="w-96 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Add New Product</h2>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-white">Product Name</label>
          <input type="text" id="productName" name="productName" className="mt-1 p-2 w-full border rounded-md pname" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea id="description" name="description" rows="4" className="mt-1 p-2 w-full border rounded-md pdesc" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
          <input type="text" id="price" name="price" className="mt-1 p-2 w-full border rounded-md pprice" required />
        </div>
        <div className="mb-4">
          <label htmlFor="productImage" className="block text-sm font-medium text-white">Product Image Link</label>
          <input type="text" id="productImage" name="productImage" className="mt-1 p-2 w-full border rounded-md pimg" required />
        </div>
        <button onClick={addPro} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Product</button>
      </div>
    </div>
  );
}
