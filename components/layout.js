import Head from "next/head";

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Calorie Tracker</title>
                <link rel="icon" href="/images/favicon.ico" />
            </Head>
            {children}
            <footer className="fixed bottom-0 py-3 bg-backgroundGray text-center w-full border border-borderGray">
                Made with ❤️ by Lawrence Mao
            </footer>
        </div>
    );
  }