import Link from 'next/link'
import Layout from '../components/layout';

export default function Home() {
    return (
        <Layout>
            <p>Hello World</p>
            <Link href="/tracker/2023-1-1">Go to 2023-1-1</Link>
        </Layout>
    );
}