import Link from 'next/link'

export default function Home() {
    return (
        <>
            <p>Hello World</p>
            <Link href="/tracker/2023-1-1">Go to 2023-1-1</Link>
        </>
    );
}