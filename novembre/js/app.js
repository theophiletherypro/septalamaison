// ==========================================
// MATRICE DES DONNÉES DE NOVEMBRE 2026
// Remplissez vos mots-clés et liens ici
// ==========================================
const calendarData = {
    1: { keyword: "Ébéniste", link: "https://amzn.to" },
    2: { keyword: "Outil PDF", link: "https://septalamaison.fr" },
    3: { keyword: "Bougie", link: "https://amzn.to" },
    4: { keyword: "SEO Maison", link: "https://amzn.to" },
    5: { keyword: "Tapis", link: "https://amzn.to" },
    // Ajoutez vos jours suivants sur le même modèle jusqu'à 30 :
    6: { keyword: "Produit 6", link: "#" },
    7: { keyword: "Produit 7", link: "#" },
    8: { keyword: "Produit 8", link: "#" },
    9: { keyword: "Produit 9", link: "#" },
    10: { keyword: "Produit 10", link: "#" },
    11: { keyword: "Produit 11", link: "#" },
    12: { keyword: "Produit 12", link: "#" },
    13: { keyword: "Produit 13", link: "#" },
    14: { keyword: "Produit 14", link: "#" },
    15: { keyword: "Produit 15", link: "#" },
    16: { keyword: "Produit 16", link: "#" },
    17: { keyword: "Produit 17", link: "#" },
    18: { keyword: "Produit 18", link: "#" },
    19: { keyword: "Produit 19", link: "#" },
    20: { keyword: "Produit 20", link: "#" },
    21: { keyword: "Produit 21", link: "#" },
    22: { keyword: "Produit 22", link: "#" },
    23: { keyword: "Produit 23", link: "#" },
    24: { keyword: "Produit 24", link: "#" },
    25: { keyword: "Produit 25", link: "#" },
    26: { keyword: "Produit 26", link: "#" },
    27: { keyword: "Produit 27", link: "#" },
    28: { keyword: "Produit 28", link: "#" },
    29: { keyword: "Produit 29", link: "#" },
    30: { keyword: "Fin Novembre", link: "#" }
};

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("calendar-grid");
    
    // 1. Génération des en-têtes de colonnes (Lundi, Mardi...)
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.className = "cell-header-day";
        header.textContent = day;
        grid.appendChild(header);
    });

    // 2. Récupération du temps réel pour le verrouillage
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 10 = Novembre
    const currentDay = now.getDate();

    // 3. Génération automatique des 30 cases de Novembre
    for (let day = 1; day <= 30; day++) {
        const data = calendarData[day] || { keyword: "À découvrir", link: "#" };
        
        // Création de la case (Lien)
        const box = document.createElement("a");
        box.href = data.link;
        box.className = "calendar-case";
        box.setAttribute("data-day", day);
        box.target = "_blank";
        box.rel = "noopener noreferrer nofollow";

        // Structure interne (Chiffre + Mot)
        box.innerHTML = `
            <div class="case-overlay">
                <span class="day-number">${day}</span>
                <span class="day-keyword">${data.keyword}</span>
            </div>
        `;

        // Logique stricte de dévoilement automatique (Sécurité Novembre 2026)
        if (currentYear < 2026 || (currentYear === 2026 && currentMonth < 10)) {
            box.classList.add("locked"); // Le mois n'a pas commencé
        } else if (currentYear === 2026 && currentMonth === 10) {
            if (day > currentDay) {
                box.classList.add("locked"); // Jours futurs verrouillés
            }
        }
        // Si l'année 2026 est passée, tout reste accessible.

        grid.appendChild(box);
    }

    // 4. Gestion de la provenance Pinterest (#jourX)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#jour')) {
        const dayNumber = hash.replace('#jour', '');
        const targetCase = document.querySelector(`[data-day="${dayNumber}"]`);
        
        if (targetCase && !targetCase.classList.contains('locked')) {
            setTimeout(() => {
                targetCase.classList.add('highlight-flash');
                targetCase.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        }
    }
});
