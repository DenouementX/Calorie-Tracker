import Link from 'next/link'

export default function Home() {
  return (
    <>
        <p>Hello World</p>
        <Link href="/tracker/dummyTrackerPage">Dummy Tracker Page</Link>
    </>
  );
}