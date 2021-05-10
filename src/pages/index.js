// import ShowsSample from "../components/ShowsSample";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";

export default function Home() {
    return (
        <div>
            <Link href="/dj">
                <a>DJ Page</a>
            </Link>
            <PlaylistExplorer/>
        </div>
    )
}