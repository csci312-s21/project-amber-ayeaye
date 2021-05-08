import ShowsSample from "../components/ShowsSample";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Link href="/dj">
                <a>DJ Page</a>
            </Link>
            <ShowsSample/>
        </div>
    )
}