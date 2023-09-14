---
description: >
  Recently I got myself a refurbished Lenovo Thinkcentre M900 Tiny which will be replacing my Raspberry Pi 4 as my home server. Similarly to my previous post about the Raspberry Pi home server...

date: 2023-09-13T21:14:00.000Z

categories:
  - Linux
  - Self-hosted
authors:
  - pablo
---

# Thinkcentre Tiny Server

## Introduction

Recently I got myself a refurbished Lenovo Thinkcentre M900 Tiny which will be replacing my Raspberry Pi 4 as my home server.

Similarly to my previous post about the Raspberry Pi home server this isn't necessarily a guide rather than me taking notes so I don't forget the commands and configurations I've done, but feel free to follow along but **remember to change the commands**.

I've added a NVME 1TB SSD and 5TB hard-drive Seagate HDD that I've shucked which it barely fitted on the case. I've also added 16GB of RAM.

In this occasion I've installed Debian Bookworm and instead of Docker I went with Podman, so I don't need to run the container as root.

For each Podman container I will create and enable a systemd service using `podman generate systemd`.

## Filesystem information

When needed podman volumes will reside in /config:

- /config/
  - calibre-web/
  - homepage/
  - jellyfin/
  - ...

5TB drive will be mounted via fstab at /mnt/data as follows:

- /mnt/data/
  - media/
    - downloads/
    - movies/
    - series/
  - backups/

## Initial configuration

Setup sudo:

```sh
su -
apt install sudo
usermod -aG sudo pablo
```

Allow ssh password authentication:

Edit /etc/sshd/sshd_config and un-comment PasswordAuthenticacion line:

```
PasswordAuthenticacion yes
```

Install basic packages:

```sh
sudo apt install podman git htop
```

These are the podman/docker containers I'm running with their respective commands, configuration for these will reside at /config and mounted for each container.

### Give permissions to podman user

Maybe be needed with some podman images.

```sh
podman unshare chown 1000:1000 -R /config/SERVICE
podman unshare chown 1000:1000 -R /mnt/data/media
```

### Enable lingering for the user that will run podman

```sh
loginctl enable-linger pablo
```

### Allow unprivileged access to port 80 and 53

Edit /etc/sysctl.conf and add:

```sh
net.ipv4.ip_unprivileged_port_start=53
```

Port 80 for Homepage and port 53 for Pihole dns.

reboot.

## Installing podman containers

### Portainer

```sh
podman run -d --name portainer \
	-p 8000:8000 -p 9443:9443  \
	--restart=unless-stopped \
	--security-opt label=disable \
	-v /var/run/user/1000/podman/podman.sock:/var/run/docker.sock \
	-v portainer_data:/data \
	docker.io/portainer/portainer-ce
```

```sh
podman generate systemd --new --name portainer > ~/.config/systemd/user/portainer.service

systemctl --user enable --now portainer.service
```

### Homarr

```sh
podman run  \
	--name homarr \
	--restart unless-stopped \
	-p 7575:7575 \
	-v /config/homarr/configs:/app/data/configs \
	-v /config/homarr/icons:/app/public/icons \
	-v /var/run/user/1000/podman/podman.sock:/var/run/docker.sock \
	-d ghcr.io/ajnart/homarr:latest

```

```sh
podman generate systemd --new --name homarr > ~/.config/systemd/user/homarr.service

systemctl --user enable --now homarr.service
```

### Homepage

```sh
podman run -d --name homepage \
	-p 80:3000 \
	-v /config/homepage:/app/config \
	-v /var/run/user/1000/podman/podman.sock:/var/run/docker.sock \
	ghcr.io/benphelps/homepage:latest
```

```sh
podman generate systemd --new --name homepage > ~/.config/systemd/user/homepage.service

systemctl --user enable homepage.service
```

### Pi-hole

```sh
podman run -d \
    --name pihole \
    -p 53:53/tcp -p 53:53/udp \
    -p 3380:80/tcp \
    -e TZ="Europe/Madrid" \
    -e WEBPASSWORD=password \
    -v pihole_pihole:/etc/pihole:Z \
    -v pihole_dnsmasq:/etc/dnsmasq.d:Z \
    --dns=127.0.0.1 --dns=1.1.1.1 \
    --restart=unless-stopped \
    --hostname pi.hole \
    docker.io/pihole/pihole:latest
```

```sh
podman generate systemd --new --name pihole > ~/.config/systemd/user/pihole.service

systemctl --user enable --now pihole.service
```

### Calibre web

```sh
podman run -d \
    --name=calibre-web-nightly \
    -e PUID=1000 -e PGID=1000 \
    -e TZ=Europe/Madrid \
    -e DOCKER_MODS=ghcr.io/linuxserver/mods:universal-calibre \
    -p 8083:8083 \
    -v /config/calibre-web/config:/config \
    -v /config/calibre-web/library:/books \
    --restart unless-stopped \
    lscr.io/linuxserver/calibre-web:nightly
```

```sh
podman generate systemd --new --name calibre-web-nightly > ~/.config/systemd/user/calibre-web.service

systemctl --user enable calibre-web.service
```

#### Calibre-tg-bot

My own telegram bot that interacts with calibre library, it can add new books to the database and query books from the library.

```sh
podman run -d --name calibre-tg-bot --volume /config/calibre-web/library:/calibre-tg-bot/books --restart unless-stopped calibre-tg-bot
```

```sh
podman generate systemd --new --name calibre-tg-bot > ~/.config/systemd/user/calibre-tg-bot.service

systemctl --user enable calibre-tg-bot.service
```

### Jellyfin

```sh
podman volume create jellyfin-cache
```

```sh

podman run \
 --detach \
 --label "io.containers.autoupdate=registry" \
 --name jellyfin \
 --publish 8096:8096/tcp \
 --rm \
 --user $(id -u):$(id -g) \
 --userns keep-id \
 --volume jellyfin-cache:/cache:Z \
 --volume /config/jellyfin:/config \
 --mount type=bind,source=/mnt/data/media,destination=/media,ro=false,relabel=private \
 docker.io/jellyfin/jellyfin:latest
```

```sh
podman generate systemd --new --name jellyfin > ~/.config/systemd/user/jellyfin.service

systemctl --user enable jellyfin.service
```

### Radarr

```sh
podman run -d --name=radarr \
    -e PUID=1000 -e PGID=1000 \
    -e TZ=Europe/Madrid \
    -p 7878:7878 \
    -v /config/radarr:/config \
    --mount type=bind,source=/mnt/data/media,destination=/data,ro=false,relabel=private \
    --restart unless-stopped \
    lscr.io/linuxserver/radarr
```

```sh
podman generate systemd --new --name radarr > ~/.config/systemd/user/radarr.service

systemctl --user enable radarr.service
```

### Sonarr

```sh
podman run -d --name=sonarr \
    -e PUID=1000 -e PGID=1000 -e \
    TZ=Europe/Madrid \
    -p 8989:8989 \
    -v /config/sonarr:/config \
    --mount type=bind,source=/mnt/data/media,destination=/data,ro=false,relabel=private \
    --restart unless-stopped lscr.io/linuxserver/sonarr:latest
```

```sh
podman generate systemd --new --name sonarr > ~/.config/systemd/user/sonarr.service

systemctl --user enable sonarr.service
```

### Transmision

```sh
podman run -d --name=transmission \
    -e PUID=1000 -e PGID=1000 \
    -e TZ=Europe/Madrid \
    -e USER=pablo -e PASS=password \
    -p 9091:9091 -p 51413:51413 -p 51413:51413/udp \
    -v /config/transmission:/config \
    -v /mnt/data/media/downloads:/data/downloads:Z \
    --restart unless-stopped lscr.io/linuxserver/transmission:latest
```

```sh
podman generate systemd --new --name transmission > ~/.config/systemd/user/transmission.service

systemctl --user enable transmission.service
```

### Monero

```sh
podman volume create bitmonero
```

```sh

podman run -d  --name="monerod" \
    --restart unless-stopped \
    -p 18080:18080 -p 18089:18089 \
    -v bitmonero:/home/monero \
    docker.io/sethsimmons/simple-monerod:latest --rpc-restricted-bind-ip=0.0.0.0 --rpc-restricted-bind-port=18089 --no-igd --no-zmq --enable-dns-blocklist --prune-blockchain
```

```sh
podman generate systemd --new --name monerod > ~/.config/systemd/user/monerod.service

systemctl --user enable monero.service
```

### Jackett

```sh
podman run -d --name=jackett \
    -e PUID=1000 -e PGID=1000 \
    -e TZ=Europe/Madrid -e \
    AUTO_UPDATE=true \
    -p 9117:9117 \
    -v /config/jackett:/config \
    -v /mnt/data/media/downloads:/downloads \
    --restart unless-stopped \
    lscr.io/linuxserver/jackett:latest
```

```sh
podman generate systemd --new --name jackett > ~/.config/systemd/user/jackett.service

systemctl --user enable jackett.service
```

### Glances

```sh
podman run -d --name glances \
	--restart="always" \
	-p 61208-61209:61208-61209 \
	-e TZ=Europe/Madrid \
	-e GLANCES_OPT="-w" \
	-v /run/user/1000/podman/podman.sock:/run/user/1000/podman/podman.sock:ro \
	--pid host nicolargo/glances:latest-full
```

```sh
podman generate systemd --new --name glances > ~/.config/systemd/user/glances.service

systemctl --user enable glances.service
```

### Watchtower

```sh
podman run -d --name watchtower \
	-v /var/run/user/1000/podman/podman.sock:/var/run/docker.sock \
	docker.io/containrrr/watchtower \
	--cleanup \
	--schedule "0 0 4 * * 0"
```

```sh
podman generate systemd --new --name watchtower > ~/.config/systemd/user/watchtower.service

systemctl --user enable watchtower.service
```

### Minecraft server

```sh
podman run -d --name mcserver-paper -v /config/mcserver:/data \
    -e TYPE=PAPER \
    -e MEMORY=10G \
    -p 25565:25565 -e EULA=TRUE docker.io/itzg/minecraft-server
```

```sh
podman generate systemd --new --name mcserver-paper > ~/.config/systemd/user/mcserver.service

systemctl --user enable mcserver.service
```

#### Playitt

```sh
podman volume create playitgg
```

```sh
podman run -d \
 --name playitgg \
 -v playitgg:/app \
 docker.io/pepaondrugs/playitgg-docker:latest
```

```sh
podman generate systemd --new --name playitgg > ~/.config/systemd/user/playitgg.service

systemctl --user enable playitgg.service
```
