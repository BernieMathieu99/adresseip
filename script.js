async function getIP() {
    try {
        let response = await fetch('https://api64.ipify.org?format=json'); // 🔍 Récupère l'IP publique
        let data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'IP :", error);
        return "Inconnu"; // Renvoie une valeur par défaut en cas d'échec
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    let userIPField = document.getElementById("userIP");

    if (!userIPField) {
        console.error("❌ Erreur : Le champ 'userIP' est introuvable !");
        return;
    }

    let ip = await getIP();
    userIPField.value = ip;
    console.log("✅ IP récupérée :", ip);
});

document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let userIPField = document.getElementById("userIP");

    if (!userIPField) {
        console.error("❌ Erreur : Le champ 'userIP' est introuvable !");
        return;
    }

    let ip = userIPField.value;

    let airtableApiKey = "Bearer patUH9l38rrOqM4Wp"; // 🔥 Vérifie que c'est un token API Airtable valide !
    let baseId = "app37Y7f8LVjUMAmV"; // 🔍 Vérifie que c'est bien l'ID de ta base
    let tableName = "Table 4";

    let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    
    console.log("📡 Envoi des données à Airtable...");
    
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": airtableApiKey, // ✅ Correction ici, vérifie bien ton token !
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fields: {
                "Nom": username,
                "Adresses IP": ip
            }
        })
    });

    let result = await response.json();
    
    if (response.ok) {
        console.log("✅ Succès ! Données enregistrées :", result);
        alert("Données envoyées !");
    } else {
        console.error("❌ Erreur API Airtable :", result);
        alert("Erreur : " + (result.error?.message || "Problème inconnu"));
    }
});
