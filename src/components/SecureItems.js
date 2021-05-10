import {useSession} from "next-auth/client";
import {useState, useEffect} from "react";
export default function SecureItems(){
  const [session] = useSession();
  const [secret, setSecret] = useState();
    useEffect(()=>{
    const getSecret = async ()=>{
      const response = await fetch("/api/secret");

      if (response.ok){
        const data = await response.json();
        setSecret(data.message);
      }else{
        setSecret(response.statusText);
      }
    };
    getSecret();
  }, [session]);
    return (
        <div>
        {(session) &&
            <p> `Welcome ${session.user.name}`</p>
            <div>{secret}</div> 
        }
        </div>
    )
}

