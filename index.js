const productList = document.getElementById("productList");

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

function displayProducts(products) {
    products.forEach(product => {
        productList.appendChild(createProductCard(product));
    });
}

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => displayProducts(data.products))
    .catch(error => console.error("Failed to fetch products:", error));
