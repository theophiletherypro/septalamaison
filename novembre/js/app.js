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

    // 2. Récupération du temps réel (Novembre 2026)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 10 = Novembre
    const currentDay = now.getDate();

    // 3. Chargement des données depuis votre dossier DATA
    fetch('./data/novembre.json')
        .then(response => response.json())
        .then(calendarData => {
            
            // Indexation des données par le numéro du jour pour la boucle
            const dataIndexedByDay = {};
            calendarData.forEach(item => {
                // Associe la ligne au numéro du jour (ex: item.jour vaut 1, 2, 3...)
                dataIndexedByDay[parseInt(item.jour, 10)] = item;
            });

            // Génération automatique des 30 cases de Novembre
            for (let day = 1; day <= 30; day++) {
                // Récupère la ligne correspondant au jour, ou applique un modèle vide par défaut
                const data = dataIndexedByDay[day] || { titre: "", lienhyp: "" };
                
                const box = document.createElement("a");
                box.href = data.lienhyp || "#";
                box.className = "calendar-case";
                box.setAttribute("data-day", day);
                box.target = "_blank";
                box.rel = "noopener noreferrer nofollow";

                box.innerHTML = `
                    <div class="case-overlay">
                        <span class="day-number">${day}</span>
                        <span class="day-keyword">${data.titre || "À venir"}</span>
                    </div>
                `;

                // Sécurité stricte de verrouillage temporel (Spécial Novembre 2026)
                if (currentYear < 2026 || (currentYear === 2026 && currentMonth < 10)) {
                    box.classList.add("locked"); // Le mois n'a pas commencé
                } else if (currentYear === 2026 && currentMonth === 10) {
                    if (day > currentDay) {
                        box.classList.add("locked"); // Jours futurs verrouillés
                    }
                }

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
        })
        .catch(error => console.error("Erreur lors du chargement de novembre.json :", error));
});
