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

let contact=document.getElementById("formContact")
contact.addEventListener("submit", function(e) {
    e.preventDefault();

    let nom = document.getElementById("nom").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("Tele").value;
    let message = document.getElementById("message").value;

    if (nom !== "" && email !== "" && number !== "" && message !== "") {
        alert("Message envoyé avec succès !");
         document.getElementById("formContact").reset(); 
         this.reset()
    } else {
        alert("Merci de remplir tous les champs !");
        
    }
});































