export async function fetchPayload(BASE_URI, collection, limit) {
    try{
        const res = await fetch(`${BASE_URI}/api/${collection}?limit=${limit}`)
        const data = await res.json()
        return data;
    } catch(e) {
        console.error(e)
    }
}