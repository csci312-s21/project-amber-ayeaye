
import LoginWidget from "../components/LoginWidget";
import SecureItems from "../components/SecureItems";

import PlaylistExplorer from "../components/PlaylistExplorer";
import Button from "@material-ui/core/Button";

export default function Home() {
    return (
        <div>
            <LoginWidget/>
            <SecureItems/>

            <Button
                href="/dj"
                variant="contained"
                color="secondary"
            >
                DJ Page
            </Button>
            <PlaylistExplorer/>
        </div>
    )
}