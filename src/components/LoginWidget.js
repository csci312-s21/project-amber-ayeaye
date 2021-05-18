import Button from "@material-ui/core/Button";
//import { positions } from "@material-ui/system";
import {
  signIn, 
  signOut,
  useSession
} from "next-auth/client";

export default function LoginWidget() {
  const [ session ] = useSession()


  if (session){
return (<div>
        <p>
          Signed in as {session.user.name} 
          <Button
            variant="contained" 
            color="primary"
            size="small"
           onClick={signOut}>Sign out
          </Button> 
        </p>
         </div>);
  }else{
    
    return (<div>
            <Button
              variant="contained" 
              color="primary"
             onClick={signIn}>Login as a Dj
            </Button>
         </div>);

  }
}
