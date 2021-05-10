import {
  signIn, 
  signOut,
  useSession
} from "next-auth/client";

export default function LoginWidget() {
  const [ session ] = useSession()


  if (session){
    console.log("session")
return (<div>
          <p>Signed in as {session.user.email} <button onClick={signOut}>Sign out</button> </p>
         </div>);
  }else{
    console.log("no session")
    return (<div>
            <button onClick={signIn}>Sign in</button>
         </div>);

  }
}
