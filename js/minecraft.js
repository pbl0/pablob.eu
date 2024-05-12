if (window.location.pathname.includes("minecraft")) {
    const serverAddress = "pablob.eu";
    const apiUrl = `https://api.mcstatus.io/v2/status/java/${serverAddress}`;
    function setServerOnline(isOnline) {
        serverStatus = isOnline ? "✅ Online." : "🔴 Offline.";
        document.getElementById("minecraft-status").textContent = serverStatus;
    }
    function setServerAddress(address) {
        document.getElementById("minecraft-address").textContent = address;
    }

    async function getServerStatus() {
        try {
            const response = await fetch(apiUrl);
            let data = await response.json();

            if (!data) {
                setServerAddress(serverAddress);
                return setServerOnline(false);
            }

            document.getElementById("minecraft-players").textContent =
                data.players.online;
            document.getElementById("minecraft-version").textContent =
                data.version.name_clean;
            document.getElementById("minecraft-icon").src = data.icon;
            setServerAddress(data.host);
            setServerOnline(data.online);
            document.getElementById("minecraft-player-list").textContent =
                data.players.list.map((item) => item.name_clean).join(", ");
        } catch (error) {
            console.error("Error fetching server status:", error);
            setServerOnline(false);
        }
    }
    getServerStatus();
}
