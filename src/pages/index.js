import LoginWidget from "../components/LoginWidget";
import SecureItems from "../components/SecureItems";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";

export default function Home() {
    return (
        <div>
            <Link href="/dj">
                <a>DJ Page</a>
            </Link>
            <LoginWidget/>
            <SecureItems/>
            <PlaylistExplorer/>
        </div>
    );
}
