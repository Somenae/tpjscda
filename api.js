
const API_BASE = "http://localhost:3000/utilisateurs";

function chargerUtilisateurs() {
    fetch(API_BASE)
        .then(response => response.json())
        .then(utilisateurs => {
            afficherTableau(utilisateurs);
        })
        .catch(error => {
            document.getElementById('contenu-tableau').innerHTML = 
                '<div class="empty-state">Erreur lors du chargement des utilisateurs. Assurez-vous que json-server est démarré.</div>';
        });
}

function afficherTableau(utilisateurs) {
    const conteneur = document.getElementById('contenu-tableau');
    
    if (!utilisateurs || utilisateurs.length === 0) {
        conteneur.innerHTML = '<div class="empty-state">Aucun utilisateur trouvé</div>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Identifiant</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Lieu de naissance</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    utilisateurs.forEach(user => {
        const adresse = `${user.numeroRue} ${user.libelleRue}, ${user.codePostal} ${user.ville}`;
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nom}</td>
                <td>${user.prenom}</td>
                <td>${user.dateNaissance}</td>
                <td>${user.lieuNaissance} (${user.departementNaissance})</td>
                <td>${adresse}</td>
                <td>
                    <button class="btn-supprimer" onclick="supprimerUtilisateur(${user.id})" title="Supprimer">🗑️</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    conteneur.innerHTML = html;
}

function supprimerUtilisateur(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        return;
    }

    fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            chargerUtilisateurs();
        } else {
            alert('Erreur lors de la suppression');
        }
    })
    .catch(error => {
        alert('Erreur lors de la suppression');
    });
}

function ouvrirFormulaireAjout() {
    alert('Formulaire d\'ajout à venir');
}

window.addEventListener('load', chargerUtilisateurs);