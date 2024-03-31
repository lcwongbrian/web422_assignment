import { getToken } from "./authenticate";

const apiPrefix = process.env.NEXT_PUBLIC_API_URL;

export async function addToFavourites(id) {
    // PUT request to /favourites/id
    const res = await fetch(`${apiPrefix}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function removeFromFavourites(id) {
    // DELETE request to /favourites/id
    const res = await fetch(`${apiPrefix}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function getFavourites() {
    // GET request to /favourites
    const res = await fetch(`${apiPrefix}/favourites`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function addToHistory(id) {
    // PUT request to /history/id
    const res = await fetch(`${apiPrefix}/history/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function removeFromHistory(id) {
    // DELETE request to /history/id
    const res = await fetch(`${apiPrefix}/history/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function getHistory() {
    // GET request to /history
    const res = await fetch(`${apiPrefix}/history`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}