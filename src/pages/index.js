// import ShowsSample from "../components/ShowsSample";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";
import Button from "@material-ui/core/Button";

export default function Home() {
    return (
        <div>
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