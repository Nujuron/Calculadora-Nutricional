export async function getProducts(url) {
    const options = {
        method: "GET"
    };
    
    return await fetch(url, options)
        .then(response => response.text())
        .then(data => {
            return JSON.parse(data);
        })
        .catch(error => {
            console.log(error);
        })
    
}