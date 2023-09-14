---
excerpt: >
  How to install Davinci Resolve in any linux distro with distrobox. For this case I'm using Manjaro Linux as the host system and with the free version of the video editor...
date: 2023-08-27T02:00:00.000Z
width: "2560"
height: "1390"
categories:
  - Linux
authors:
  - pablo
---

# How to install Davinci Resolve in any linux distro

How to install Davinci Resolve in any linux distro with distrobox. For this case I'm using Manjaro Linux as the host system and with the free version of the video editor.

<!-- more -->

<figure markdown>
  ![Post cover](/assets/blog/davinci/install/cover.png){ .cover .image loading=lazy }
</figure>

## Installation

- Install distrobox and podman:

```sh
sudo pacman -Syu podman distrobox
```

- Create a Fedora container with distrobox:

```sh
distrobox-create --name fedora --image fedora:38
```

- Download Davinci Resolve from the [official website](https://www.blackmagicdesign.com/es/products/davinciresolve) and extract the zip file.

- Enter your distrobox container:

```sh
distrobox enter fedora
```

- Running `DaVinci_Resolve_18.5.1_Linux.run -i` will give many dependency errors, install whatever package it ask using `dnf install` and re-run the executable.

- When you notice it doesn't complain about dependencies anymore. Run the executable again with `sudo`. That should install the program inside your container.

- In my case, launching `/opt/resolve/bin/resolve` will result in a glib error that I've solved by renaming every libglib within `/opt/resolve/libs` as shown below. This apparently forces Davinci Resolve to use the system's libraries instead of the ones that come built-in with the video editor.

```sh
cd /opt/resolve/libs

sudo mv libglib-2.0.so.0.6800.4 libglib-2.0.so.0.6800.4.bak
sudo mv libglib-2.0.so.0 libglib-2.0.so.0.bak
sudo mv libglib-2.0.so.0 libglib-2.0.so.bak
```

- Now if you run `/opt/resolve/bin/resolve` within the container it will hopefully open Davinci Resolve without any more errors.

- To integrate the application to your host system run:

```sh
distrobox-export --app /opt/resolve/bin/resolve
```

For some reason the default launcher created with the previous will fail to launch. If this happens right click on Davinci Resolve icon > Edit Application > Application and leave the `Work Path` field empty.

<figure markdown>
  ![Edit app launcher](/assets/blog/davinci/install/davinci-edit-launcher.png){ .image loading=lazy }
  <figcaption>Edit app launcher</figcaption>
</figure>

- Now you should be able to launch Davinci Resolve from your host system and start editing!

<figure markdown>
  ![Davinci Resolve opened](/assets/blog/davinci/install/davinci-app.png){ .image loading=lazy }
  <figcaption>Davinci Resolve</figcaption>
</figure>

## Issues detected

- Will crash every time I click on the Fusion tab.
