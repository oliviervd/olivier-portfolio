import {useEffect, useState} from "preact/hooks";
import "../style/navigation.css"

const CalculateSize = () => {
    const [pageSize, setPageSize] = useState(0)

    useEffect(() => {
        calculatePageSize()
    }, []);

    function calculatePageSize() {
        let totalSizeBytes = document.documentElement.outerHTML.length;

        // Iterate through all resources (images, scripts, stylesheets, etc.)
       document.querySelectorAll('img, script, link[rel="stylesheet"]').forEach((resource) => {
            if ('src' in resource) {
                // For images and scripts
                totalSizeBytes += getResourceSize(resource.src);
            } else if ('href' in resource) {
                // For stylesheets
                totalSizeBytes += getResourceSize(resource.href);
            }
        });

        // Convert total size to KB
        const totalSizeKB = totalSizeBytes / 1024;
        setPageSize(totalSizeKB)
    }

    function getResourceSize(url) {
        // todo: fix CORS
        // Assume synchronous XMLHttpRequest (for simplicity; may not be ideal in all cases)
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
        if (xhr.status === 200) {
            return parseInt(xhr.getResponseHeader('Content-Length'), 10) || 0;
        }
        return 0;
    }


    return(
        <div className={"pageSize"}>
            <p>size: {pageSize} KB</p>
        </div>
    )
}
export default CalculateSize