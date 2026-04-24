let products = [
    {
        image: "image/EV.png",
        titre: "Huile Premium",
        prix: 299,
        description: "Huile d’olive extra vierge"
    },
    {
        image: "image/v.png",
        titre: "Huile Bio",
        prix: 199,
        description: "100% naturelle"
    },
    {
        image: "image/QM.png",
        titre: "Huile Classique",
        prix: 119,
        description: "Qualité standard"
    }
];

let cart = [];


function displayProducts() {
    let container = document.getElementById("products");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach((product, index) => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.titre}">
            <h3>${product.titre}</h3>
            <p>${product.description}</p>
            <p><strong>${product.prix} MAD</strong></p>

            <button onclick="addToCart(${index})">Ajouter au panier</button>
            <button onclick="editProduct(${index})">Modifier</button>
            <button onclick="deleteProduct(${index})">Supprimer</button>
        `;

        container.appendChild(card);
    });
}

displayProducts();


let contact = document.getElementById("formContact");

if (contact) {
    contact.addEventListener("submit", function(e) {
        e.preventDefault();

        let nom = document.getElementById("nom").value.trim();
        let email = document.getElementById("email").value.trim();
        let number = document.getElementById("Tele").value.trim();
        let message = document.getElementById("message").value.trim();

        if (nom && email && number && message) {
            alert("Formulaire envoyé avec succès !");
            this.reset();
        } else {
            alert("Veuillez remplir tous les champs !");
            this.reset();
        }
    });
}

// Fonction dyal Supprimer
function deleteProduct(index) {
    // Kay-tl3 message kay-t2eked wach bseh bghiti t-ms7o
    let confirmation = confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (confirmation) {
        products.splice(index, 1); // Kay-ms7 produit mn l'array
        displayProducts(); // Kay-3awd i-afficher l'produits jdad
    }
}

let currentIndex;
let modal = document.getElementById("edit-modal");

// ouvrir modal
function editProduct(index) {
    currentIndex = index;

    document.getElementById("edit-titre").value = products[index].titre;
    document.getElementById("edit-prix").value = products[index].prix;
    document.getElementById("edit-desc").value = products[index].description;

    modal.style.display = "flex";
}

// fermer modal
document.getElementById("close-edit").onclick = function () {
    modal.style.display = "none";
};

// sauvegarder modification
document.getElementById("save-edit-btn").onclick = function () {
    products[currentIndex].titre = document.getElementById("edit-titre").value;
    products[currentIndex].prix = document.getElementById("edit-prix").value;
    products[currentIndex].description = document.getElementById("edit-desc").value;

    modal.style.display = "none";

    displayProducts();
};


function addToCart(index) {
    let selectedProduct = products[index];
    let existingItem = cart.find(item => item.titre === selectedProduct.titre);
    
    if (existingItem) {
        existingItem.quantite++; 
    } else {
        cart.push({ ...selectedProduct, quantite: 1 }); 
    }
    
    updateCartUI();
    
    let sideCart = document.getElementById("side-cart");
    if (sideCart) {
        sideCart.classList.add("active");
    }
}

function changeQty(index, delta) {
    cart[index].quantite += delta;
    if (cart[index].quantite <= 0) {
        removeFromCart(index);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const countLabel = document.getElementById("cart-count");
    const totalLabel = document.getElementById("cart-total");
    
    if (!container) return; 
    
    container.innerHTML = "";
    let totalGlobal = 0;
    let totalItems = 0;

    cart.forEach((item, i) => {
        let totalProduit = item.prix * item.quantite;
        totalGlobal += totalProduit;
        totalItems += item.quantite;
        
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item-ui");
        itemDiv.innerHTML = `
            <div class="cart-item-header">
                <h4>${item.titre}</h4>
                <button class="delete-btn" onclick="removeFromCart(${i})">X</button>
            </div>
            <div class="cart-item-price">Prix unitaire: ${item.prix} MAD</div>
            <div class="cart-item-actions">
                <div class="qty-controls">
                    <button onclick="changeQty(${i}, -1)">-</button>
                    <span>${item.quantite}</span>
                    <button onclick="changeQty(${i}, 1)">+</button>
                </div>
                <div class="item-total-price">
                    <strong>${totalProduit} MAD</strong>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    });

    if (countLabel) countLabel.innerText = totalItems;
    if (totalLabel) totalLabel.innerText = totalGlobal;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

let openCartBtn = document.getElementById("open-cart");
let closeCartBtn = document.getElementById("close-cart");
let sideCartElement = document.getElementById("side-cart");

if (openCartBtn && sideCartElement) {
    openCartBtn.onclick = () => sideCartElement.classList.add("active");
}
if (closeCartBtn && sideCartElement) {
    closeCartBtn.onclick = () => sideCartElement.classList.remove("active");
}

