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

    function timePassed(startDate) {
        const start = new Date(startDate);
        const currentDate = new Date();

        // Calculate the total difference in months and years
        let totalMonths =
            (currentDate.getFullYear() - start.getFullYear()) * 12 +
            (currentDate.getMonth() - start.getMonth());
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        let result = "Running for ";

        if (years > 0) {
            result += years + " year" + (years > 1 ? "s" : "");
        }

        if (months > 0) {
            if (years > 0) {
                result += " and ";
            }
            result += months + " month" + (months > 1 ? "s" : "");
        }

        if (years === 0 && months === 0) {
            result += "less than a month.";
        } else {
            result += ".";
        }

        return result;
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

        timePassed("2024-03-07");
    }

    getServerStatus();
}
