
import LoginWidget from "../components/LoginWidget";
import SecureItems from "../components/SecureItems";
import {useState} from "react";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";
import Button from "@material-ui/core/Button";

export default function Home() {
const [user, setUser] = useState();
    return (
        <div>
            <LoginWidget/>
            <SecureItems setUser={setUser}/>
            <PlaylistExplorer/>
        {(user) &&
          <Link href="/dj">
            <Button
            variant="contained"
            color="secondary"
            >DJ Page</Button>
          </Link>  
        }
        </div>
    )
}