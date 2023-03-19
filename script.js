// Charger les données sauvegardées
window.addEventListener("DOMContentLoaded", function () {
    const montantActuel = localStorage.getItem("montantActuel");
    const progression = localStorage.getItem("progression");
    const objectif = localStorage.getItem("objectif");

    if (montantActuel) {
        document.getElementById("montantActuel").innerText = montantActuel;
    }

    if (progression) {
        document.getElementById("progression").innerText = progression;
        document.getElementById("progressBar").style.width = progression + "%";
    }

    if (objectif) {
        document.getElementById("objectif").innerText = objectif;
    }
});

// Modifier l'objectif de la cagnotte
document.getElementById("modifierObjectifBtn").addEventListener("click", function () {
    const nouvelObjectif = parseFloat(prompt("Entrez le nouvel objectif de la cagnotte :", document.getElementById("objectif").innerText));

    if (isNaN(nouvelObjectif) || nouvelObjectif < 0) {
        alert("Veuillez entrer un objectif valide.");
        return;
    }

    document.getElementById("objectif").innerText = nouvelObjectif.toFixed(2);
    localStorage.setItem("objectif", nouvelObjectif.toFixed(2));
});

// Ajouter un montant à la cagnotte
document.getElementById("ajoutForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const ajoutMontant = parseFloat(document.getElementById("ajoutMontant").value);
    const montantActuel = parseFloat(document.getElementById("montantActuel").innerText);
    const objectif = parseFloat(document.getElementById("objectif").innerText);

    if (isNaN(ajoutMontant) || ajoutMontant < 0) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    let nouveauMontant = montantActuel + ajoutMontant;
    if (nouveauMontant > objectif) {
        alert("Le montant ajouté dépasse l'objectif. Veuillez entrer un montant inférieur.");
        return;
    }

    document.getElementById("montantActuel").innerText = nouveauMontant.toFixed(2);
    document.getElementById("ajoutMontant").value = "";

    const progression = (nouveauMontant / objectif) * 100;
    document.getElementById("progression").innerText = progression.toFixed(2);
    document.getElementById("progressBar").style.width = progression + "%";

    // // Sauvegarder les données dans localStorage
    // localStorage.setItem("montantActuel", nouveauMontant.toFixed(2));
    // localStorage.setItem("progression", progression.toFixed(2));
}); // Ajout de l'accolade manquante ici


// Retirer une somme de la cagnotte
document.getElementById("retraitForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const retraitSomme = parseFloat(document.getElementById("retraitSomme").value); // Changement d'ID ici
    const montantActuel = parseFloat(document.getElementById("montantActuel").innerText);
    const objectif = parseFloat(document.getElementById("objectif").innerText);

    if (isNaN(retraitSomme) || retraitSomme < 0) {
        alert("Veuillez entrer une somme valide.");
        return;
    }

    let nouveauMontant = montantActuel - retraitSomme;
    if (nouveauMontant < 0) {
        alert("La somme retirée est supérieure au montant actuel. Veuillez entrer une somme inférieure.");
        return;
    }

    document.getElementById("montantActuel").innerText = nouveauMontant.toFixed(2);
    document.getElementById("retraitSomme").value = ""; // Changement d'ID ici

    const progression = (nouveauMontant / objectif) * 100;
    document.getElementById("progression").innerText = progression.toFixed(2);
    document.getElementById("progressBar").style.width = progression + "%";

    // Sauvegarder les données dans localStorage
    localStorage.setItem("montantActuel", nouveauMontant.toFixed(2));
    localStorage.setItem("progression", progression.toFixed(2));
});
