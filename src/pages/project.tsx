import { useRoute } from 'preact-iso';

export function Project() {

    return(
        <div>
            <h1>project</h1>
            {matches ? (
                <p>Project ID: {params?.id ? params.id : "No ID provided"}</p>
            ) : (
                <p>404: Page Not Found</p>
            )}
        </div>
    )
}
