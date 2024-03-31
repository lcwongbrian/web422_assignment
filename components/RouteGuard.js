import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
    const router = useRouter();

    const [authorized, setAuthorized] = useState(false);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const authCheck = (url) => {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {            
            setAuthorized(true);
        }
    };

    const updateAtoms = async () => {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    };

    useEffect(() => {
        if (isAuthenticated()) updateAtoms();
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    return <>{authorized && props.children}</>
}