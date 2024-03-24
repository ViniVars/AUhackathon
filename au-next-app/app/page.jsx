'use client'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { checkcred } from '../actions/server';
import {useRouter} from 'next/navigation';
export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useRouter()
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  async function confirmcred(){
    let name = document.querySelector('.username').value;
    let pass = document.querySelector('.pass').value;
    if(name && pass){
      let check = 0;
    for(let i=0;i<name.length;i++){
      if(name[i]=='_'){
        check = 1;
        break;
      }
    }
    if(check==1){
      // window.alert("invalid username has been entered");
      Swal.fire({
        icon: "error",
        title: "Invalid UserName",
        text: "UserName Should not contain UnderScore( _ ) ",
      });
    }
    else{
      if(checkcred('Login', {name})){
        sessionStorage.setItem('uname', name);
        navigate.push('/Home');
      }
    }
    }
  }

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} bgm`}>
      <div className="w-96 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="logo flex justify-center items-center gap-3">
        <img src="data:image/jpeg;base64,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" alt="" />
        <h1 className='text-2xl font-bold'>Heritage Haven</h1>
        </div>
        <br />
        <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md username" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md pass" />
          </div>
          <button onClick={confirmcred} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
        <div className="mt-4 text-center">
          <span className="text-gray-500">Don't have an account?</span>
          <a href={`/register`} className="text-blue-600 font-medium">Register Now</a>
        </div>
      </div>
    </div>
  );
}
