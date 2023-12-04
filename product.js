// Function to extract query parameters from URL
function extractQueryParam(parameter) {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter);
}

// Retrieve product ID from URL
const productID = extractQueryParam('id');

// Log the product ID for debugging purposes
console.log("Product ID:", productID);

// Function to handle the rendering of product details
const renderProductDetails = (productData) => {
    // Set the document title to the product title
    document.title = productData.title;

    document.getElementById('productTitle').textContent = productData.title;

    document.getElementById('productDescription').textContent = productData.description;

    // Update product price
    document.getElementById('productPrice').textContent = "Price: $" + productData.price;

    // Update product rating
    document.getElementById('productRating').textContent = "Rating: " + productData.rating;

    // Update product stock
    document.getElementById('productStock').textContent = "Stock: " + productData.stock;

    // Update product brand
    document.getElementById('productBrand').textContent = "Brand: " + productData.brand;

    // Update product category
    document.getElementById('productCategory').textContent = "Category: " + productData.category;

    // Update product images
    const imagesContainer = document.getElementById('productImages');
    productData.images.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Product Image";
        imagesContainer.appendChild(imgElement);
    });
}

// Fetch product data from API
fetch("https://dummyjson.com/products/" + productID)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(productData => {
        console.log("Fetched Product Data:", productData);
        renderProductDetails(productData);
    })
    .catch(error => {
        console.error("Error fetching product data:", error);
    });
