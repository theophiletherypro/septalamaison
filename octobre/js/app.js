document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById("calendar-grid");
    
    // Récupération automatique de la date du jour réelle de l'utilisateur
    const aujourdHui = new Date();
    const jourActuel = aujourdHui.getDate();
    const moisActuel = aujourdHui.getMonth(); // 9 = Octobre en JavaScript

    // Liste des bannières de thèmes à intercaler (Index du jour d'insertion)
    const themes = {
        1: "Semaine Déco",
        5: "Semaine Cuisine",
        12: "Semaine Organisation",
        19: "Semaine Famille",
        26: "Semaine Bien-être"
    };

    // 1. Décalage pour le début du mois (Octobre 2026 commence un Jeudi = 3 cases vides : Lun, Mar, Mer)
    for (let i = 0; i < 3; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "cell cell-empty";
        calendarGrid.appendChild(emptyCell);
    }

    // 2. Chargement asynchrone du fichier de données JSON
    fetch("data/octobre.json")
        .then(response => response.json())
        .then(data => {
            
            // Si le fichier JSON est vide ou n'a pas encore 31 éléments, on génère les 31 jours automatiquement
            const totalJours = data.length > 0 ? data.length : 31;

            for (let d = 1; d <= totalJours; d++) {
                // Trouver si des données existent pour ce jour spécifique dans le JSON
                const jourData = data.find(item => item.day === d) || { day: d, url: "#", image: "", title: "" };

                // Insertion de la bannière thématique en début de ligne si elle est planifiée
                if (themes[d]) {
                    const themeCell = document.createElement("div");
                    themeCell.className = "cell cell-theme";
                    themeCell.innerText = themes[d];
                    calendarGrid.appendChild(themeCell);
                }

                const dayCell = document.createElement("div");

                // --- CONDITION A : LE JOUR EST PASSÉ OU C'EST AUJOURD'HUI ---
                // (Affichage direct de l'image d'affiliation si disponible)
                if (d <= jourActuel || moisActuel > 9) {
                    dayCell.className = "cell";
                    
                    // Si une image est configurée dans le tableau, on l'affiche, sinon on met un fond neutre d'attente
                    if (jourData.image && jourData.image !== "") {
                        dayCell.style.cursor = "pointer";
                        dayCell.innerHTML = `
                            <img src="${jourData.image}" alt="${jourData.title || 'Inspiration du jour'}" style="width:100%; height:100%; object-fit:cover; border-radius:6px;">
                            <span class="click-badge">🔗</span>
                        `;
                        
                        // Clic -> Ouvre votre lien d'affiliation Excel dans un nouvel onglet
                        dayCell.addEventListener("click", () => {
                            if (jourData.url && jourData.url !== "#") {
                                window.open(jourData.url, "_blank");
                            }
                        });
                    } else {
                        // Si le jour est passé mais que vous n'avez pas encore mis d'image dans votre Excel
                        dayCell.style.backgroundColor = "var(--swello-case-passé)";
                        dayCell.style.display = "flex";
                        dayCell.style.alignItems = "center";
                        dayCell.style.justifyContent = "center";
                        dayCell.innerHTML = `<span style="font-size:0.8rem; color:var(--accent-color); font-weight:700;">Jour ${d}</span>`;
                    }
                } 
                // --- CONDITION B : LE JOUR EST DANS LE FUTUR ---
                // (Protection 3D masquée avec message d'attente)
                else {
                    dayCell.className = "cell cell-future";
                    dayCell.innerHTML = `
                        <div class="card-inner">
                            <div class="card-front"></div>
                            <div class="card-back">🔒 Bientôt disponible... Revenez demain ! ✨</div>
                        </div>
                    `;
                    
                    // Effet de bascule 3D au clic pour révéler le message secret de blocage
                    dayCell.addEventListener("click", function() {
                        this.classList.toggle("flipped");
                    });
                }

                calendarGrid.appendChild(dayCell);
            }
        })
        .catch(err => {
            console.error("Erreur lors de la lecture du fichier de données :", err);
        });
});
