import {useQuery} from "@tanstack/react-query";

export async function fetchPayload(BASE_URI: string, collection: string, limit: number) {
    try{
        const res = await fetch(`${BASE_URI}/api/${collection}?limit=${limit}`)
        const data = await res.json()
        return data;
    } catch(e) {
        console.error(e)
    }
}

export function useCachedPayload(BASE_URI: string, collection: string, limit:number) {
    return useQuery({
        queryKey: ['fetchPayload', {collection, limit}],
        queryFn: ()=> fetchPayload(BASE_URI, collection, limit),
        staleTime: 1000 * 60 * 60 * 24,
    })
}