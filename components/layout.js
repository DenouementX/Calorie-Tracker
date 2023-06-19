import Head from "next/head";

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Calorie Tracker</title>
                <link rel="icon" href="/images/favicon.ico" />
            </Head>
            {children}
        </div>
    );
  }