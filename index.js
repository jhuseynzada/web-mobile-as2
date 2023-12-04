const productList = document.getElementById("productList");
const productSearch = document.getElementById("productSearch");
const filterByCategory = document.getElementById("filterByCategory");

function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = product.thumbnail;
    card.appendChild(img);

    const content = document.createElement("div");
    content.classList.add("content");

    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = product.title;
    content.appendChild(title);

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$${product.price}`;
    content.appendChild(price);

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = product.description;
    content.appendChild(description);

    card.appendChild(content);
    return card;
}

var productsArray = []

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        productList.appendChild(createProductCard(product));
    });
    console.log(productsArray)
}

// Function to apply filters and show the corresponding products
const applyProductFilters = () => {
    const keyword = productSearch.value.toLowerCase();
    const chosenCategory = filterByCategory.value;

    const productsToShow = productsArray.filter(product => {
        const keywordMatch = product.title.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword) ||
            (product.category && product.category.toLowerCase().includes(keyword));
        const categoryMatch = !chosenCategory || product.category === chosenCategory;
        return keywordMatch && categoryMatch;
    });
    renderProducts(productsToShow);
};

// Event listeners for search and category filter
productSearch.addEventListener('input', applyProductFilters);
filterByCategory.addEventListener('change', applyProductFilters);

fetch("https://dummyjson.com/products?limit=60")
    .then(response => response.json())
    .then(data => {
        productsArray = data.products
        renderProducts(productsArray)
    })
    .catch(error => console.error("Failed to fetch products:", error));

fetch("https://dummyjson.com/products/categories")
    .then(res => res.json())
    .then(categories => {
        console.log(categories)
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterByCategory.appendChild(option);
        });
    })
    .catch(err => console.log(err));