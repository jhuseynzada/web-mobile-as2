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

    const discount = document.createElement("p");
    discount.classList.add("discount");
    discount.textContent = `${product.discountPercentage}% off`;
    content.appendChild(discount);

    // Button to redirect to another page
    const button = document.createElement("button");
    button.textContent = "See more";
    button.classList.add("view-more");
    button.addEventListener("click", () => {
        window.location = 'product.html?id='+product.id;
    });

    content.appendChild(button);

    card.appendChild(content);
    return card;
}

var productsArray = []
const cardsPerpage = 9;
var currPage = 1;

function renderProducts(products) {
    productList.innerHTML = '';
    window.scrollTo(0,0)
    const start = (currPage - 1) * cardsPerpage;
    const slicedCards = products.slice(start, start + cardsPerpage);
    slicedCards.forEach(product => {
        productList.appendChild(createProductCard(product));
    });
    refreshPagination(products.length);
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
    if(currPage * cardsPerpage >= productsToShow.length + cardsPerpage) currPage = 1
    renderProducts(productsToShow);
};

// Event listeners for search and category filter
productSearch.addEventListener('input', applyProductFilters);
filterByCategory.addEventListener('change', applyProductFilters);


// Function to refresh pagination
const refreshPagination = (totalItems) => {
    totalPageCount = Math.ceil(totalItems / cardsPerpage);
    const paginationContainer = document.getElementById('pageNumberContainer');
    paginationContainer.innerHTML = '';

    for (let page = 1; page <= totalPageCount; page++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = page;
        pageButton.className = 'page-number';
        if (page === currPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currPage = page;
            applyProductFilters();
        });
        paginationContainer.appendChild(pageButton);
    }

    document.getElementById('prevPage').disabled = currPage === 1;
    document.getElementById('nextPage').disabled = currPage === totalPageCount;
};

// Pagination button events
document.getElementById("prevPage").addEventListener('click', () => {
    if (currPage > 1) {
        currPage--;
        applyProductFilters();
    }
});

document.getElementById("nextPage").addEventListener('click', () => {
    if (currPage < totalPageCount) {
        currPage++;
        applyProductFilters();
    }
});


// Event listeners for previous and next buttons
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
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterByCategory.appendChild(option);
        });
    })
    .catch(err => console.log(err));