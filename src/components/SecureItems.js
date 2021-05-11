import {useSession} from "next-auth/client";
import {useState, useEffect} from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";

export default function SecureItems({setUser}){
  const [session] = useSession();
 // const [user, setUser] = useState();
  //const [users, setUsers] = useState();
    useEffect(()=>{
    const getUser = async ()=>{
      const response = await fetch("/api/secret");
      if (response.ok){
        const data = await response.json();
        setUser(data.username);
      }else{
        setUser(response.statusText);
      }
    };
    getUser();
  }, [session]);
    return (
        <div>
        {(session) && setUser} 
        </div>
    )
}

