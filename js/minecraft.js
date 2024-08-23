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

        // Calculate the difference in years, months, and days
        let years = currentDate.getFullYear() - start.getFullYear();
        let months = currentDate.getMonth() - start.getMonth();
        let days = currentDate.getDate() - start.getDate();

        // Adjust if the days are negative
        if (days < 0) {
            months--;
            const previousMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            );
            days += previousMonth.getDate();
        }

        // Adjust if the months are negative
        if (months < 0) {
            years--;
            months += 12;
        }

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

        if (days > 0) {
            if (years > 0 || months > 0) {
                result += " and ";
            }
            result += days + " day" + (days > 1 ? "s" : "");
        }

        if (years === 0 && months === 0 && days === 0) {
            result += "less than a day.";
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
            if (data.players.online < data.players.list.length) {
                // for vanish
                data.players.list = data.players.list.filter(
                    (item) => item.name_clean !== "pbl0"
                );
            }
            let playerList = data.players.list
                .map((item) => item.name_clean)
                .join(", ");
            document.getElementById("minecraft-player-list").textContent =
                playerList;
        } catch (error) {
            console.error("Error fetching server status:", error);
            setServerOnline(false);
        }
    }

    getServerStatus();
    document.getElementById("minecraft-time-passed").textContent =
        timePassed("2024-03-07");
}
