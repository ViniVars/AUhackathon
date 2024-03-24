
import { initializeApp } from "firebase/app";
import { getDatabase, update, ref, onValue } from "firebase/database";import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8sE1WodJUnurx4roFS0mf3KWIl2Ipi7c",
  authDomain: "invigilator-assign.firebaseapp.com",
  databaseURL: "https://invigilator-assign-default-rtdb.firebaseio.com",
  projectId: "invigilator-assign",
  storageBucket: "invigilator-assign.appspot.com",
  messagingSenderId: "610028038079",
  appId: "1:610028038079:web:ab0db1e0a6ca11e054230a",
  measurementId: "G-B9CCJ24YGN"
};


const app = initializeApp(firebaseConfig);
const db1 = getDatabase(app);

export async function read(path) {
    return new Promise((res, rej) => {
      onValue(ref(db1, path), (response) => res(response.val()));
    });
  }

export async function newcred(path, cred) {
    let m = await read(`${path}/${cred.username}`);
    
    update(ref(db1, path), {
      [cred.username] : {

        password : cred.pass,
        name : cred.name,
        age : cred.age,
        loc : cred.loc,
        Products : '',

      }
    })

  }
  
  export async function checkcred(path, cred) {
    let m = await read(`${path}/${cred.name}`)
    if(!m){
      return false
    }
    if(m.password == cred.password){
      return true
    }
    return false
    
  }

  export async function addpro(user, v, cred){
    let m = await read(`Login/${user}/Products`)
    if(m == null || undefined){
        m = `${cred.pname}_${v}`
    }
    else{

        m = m + `@${cred.pname}_${v}`
    }
    update(ref(db1, `Login/${user}`), {
        Products : m,
    })
    update(ref(db1, `Products`), {
        [`${user}_${cred.pname}_${v}`] : {
          Price : cred.pprice,
          Desc : cred.pdesc,
          img : cred.pimg,
        }
    })
  }