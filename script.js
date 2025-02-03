
async function getIP() {
    let response = await fetch('https://api64.ipify.org?format=json'); // Récupère l'IP publique
    let data = await response.json();
    return data.ip;
}

document.addEventListener("DOMContentLoaded", async () => {
    let ip = await getIP();
    document.getElementById("userIP").value = ip;
});

document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let ip = document.getElementById("userIP").value;

    let airtableApiKey = "Bearer pat5a1oslcmKvYSID";
    let baseId = "app37Y7f8LVjUMAmV";
    let tableName = "Table 4";

    let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${airtableApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fields: {
                "Nom": username,
                "Adresses IP": ip
            }
        })
    });

    if (response.ok) {
        alert("Données envoyées !");
    } else {
        alert("Erreur lors de l'envoi des données.");
    }
});