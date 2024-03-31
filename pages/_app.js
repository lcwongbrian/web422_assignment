import { SWRConfig } from "swr";
import "@/styles/globals.css";
import "@/styles/bootstrap.min.css";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";

const fetcher = async (url) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }
    return res.json();
};

export default function App({ Component, pageProps }) {
    return (
        <SWRConfig value={{ fetcher }}>
            <RouteGuard>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RouteGuard>
        </SWRConfig>
    );
}
