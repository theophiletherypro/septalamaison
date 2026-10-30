let baseDonneesNovembre = {};

async function chargerAlmanach() {
    try {
        const reponse = await fetch('./data/novembre.json');
        const donnees = await reponse.json();
        
        donnees.forEach(item => {
            baseDonneesNovembre[item.jour] = item;
        });

        construireGrille();
        detecterLienPinterest();
    } catch (erreur) {
        console.error("Erreur de chargement du JSON de Novembre :", erreur);
        construireGrille();
    }
}

function construireGrille() {
    const grille = document.getElementById('calendar-grid');
    const totalJour = 30; 
    
    // ÉTAPE ALIGNEMENT : 6 cases vides pour caler le Jour 1 sous le Dimanche
    for (let e = 0; e < 6; e++) {
        const caseVide = document.createElement('div');
        caseVide.className = "cell-empty";
        grille.appendChild(caseVide);
    }

    // Injection des 30 jours réels style Swello
    for (let jour = 1; jour <= totalJour; jour++) {
        const item = baseDonneesNovembre[jour];
        const caseCalendrier = document.createElement('div');
        
        if (item) {
            caseCalendrier.className = "cell";
            caseCalendrier.style.cursor = "pointer";
            caseCalendrier.style.backgroundColor = "var(--swello-case-passé)";
            caseCalendrier.innerHTML = `
                <div class="day-number">${jour}</div>
                <div class="click-badge">✨</div>
            `;
            caseCalendrier.onclick = () => ouvrirModale(jour);
        } else {
            caseCalendrier.className = "cell cell-future";
            caseCalendrier.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="day-number" style="opacity: 0.5;">${jour}</div>
                    </div>
                    <div class="card-back">Jour ${jour}</div>
                </div>
            `;
            caseCalendrier.onclick = () => {
                caseCalendrier.classList.toggle('flipped');
                setTimeout(() => {
                    alert(`La case du jour ${jour} ouvrira bientôt ses portes ! 🔒`);
                    caseCalendrier.classList.remove('flipped');
                }, 600);
            };
        }
        grille.appendChild(caseCalendrier);
    }
}

function ouvrirModale(jour) {
    const item = baseDonneesNovembre[jour];
    if (!item) return;
    document.getElementById('modal-day').innerText = `Idée du ${jour} Novembre`;
    document.getElementById('modal-title').innerText = item.titre;
    document.getElementById('modal-desc').innerText = item.description;
    document.getElementById('modal-image').innerHTML = `<img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">`;
    document.getElementById('modal-link').href = item.lienAmazon;
    document.getElementById('product-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// Intercepteur d'URL secret pour Pinterest (?day=X)
function detecterLienPinterest() {
    const parametresUrl = new URLSearchParams(window.location.search);
    const jourCible = parametresUrl.get('day');
    if (jourCible && baseDonneesNovembre[jourCible]) {
        ouvrirModale(parseInt(jourCible));
    }
}

window.addEventListener('DOMContentLoaded', chargerAlmanach);
