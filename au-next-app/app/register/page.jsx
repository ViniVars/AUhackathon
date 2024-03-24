'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkcred, newcred} from '../../actions/server'
export default function Register() {
  const [darkMode, setDarkMode] = useState(true);
  const navigation =  useRouter()
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  async function addCred(){
    let name = document.querySelector('.name').value;
    let age = document.querySelector('.age').value;
    let username = document.querySelector('.username').value;
    let pass = document.querySelector('.pass').value;
    let cpass = document.querySelector('.cpass').value;
    let loc = document.querySelector('.loc').value;
    if(name && age && username && pass && cpass && loc && (cpass == pass)){
      let check = 0;
      for(let i = 0;i<username.length;i++){
        if(username[i]=='_'){
          check = 1;
          break;
        }
      }
      if(check==1){
        window.alert("invalid username has been entered");
      }
      else{
        newcred('Login', {name, age, username, pass, cpass, loc})
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('uname', username);
        navigation.push('/Home')
      }
    }
  }

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <div className="w-96 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input type="text" id="name" name="name" placeholder="Name" className="p-2 border rounded-md name" />
      <input type="text" id="age" name="age" placeholder="Age" className="p-2 border rounded-md age" />
      <input type="text" id="username" name="username" placeholder="Username" className="p-2 border rounded-md username" />
      <input type="password" id="password" name="password" placeholder="Password" className="p-2 border rounded-md pass" />
      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className="p-2 border rounded-md cpass" />
      <input type="text" id="location" name="location" placeholder="Location" className="p-2 border rounded-md loc" />
      <button onClick={addCred} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">Register</button>
    </div>
    {/* <button onClick={toggleDarkMode} className="fixed bottom-5 right-5 p-2 bg-gray-300 dark:bg-gray-700 rounded-full">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button> */}
  </div>

  );
}

