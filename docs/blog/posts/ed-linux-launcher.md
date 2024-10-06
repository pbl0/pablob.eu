---
description: >
    Elite Dangerous used to be playable out the box using Steam proton but now it isn't"
date: 2023-01-25T23:40:00.000Z
categories:
    - Games
    - Linux
authors:
    - pablo
comments: true
---

# How to fix Elite Dangerous launcher issues on Linux

Elite Dangerous used to be playable out the box using Steam Proton but for some reason in the last few years it has become an immense hassle to play Elite Dangerous on Linux. While the game itself runs fine most of the times the launcher it's the one causing issues because it's completely broken under Linux.

<!-- more -->

<figure markdown>
  ![Post cover](/assets/blog/minedlauncher/cover.png){ .cover .image loading=lazy }
</figure>

Sadly, Frontier Developments doesn't seem to care enough about Linux users, so we might need to try many of the solutions that users have suggested at [protondb](https://www.protondb.com/app/359320) and see if anything works, which in my case they never did, except one.

After many months of not being able to launch the game, I randomly came across to an unofficial CLI launcher called [min-ed-launcher](https://github.com/rfvgyhn/min-ed-launcher/) (_Minimal Elite Dangerous Launcher_) which replaces the original launcher and allows us to launch the game directly from the terminal or through steam. And it really just works!

## How to install Min-Ed-Launcher

You can [download it](https://github.com/rfvgyhn/min-ed-launcher/releases/latest) from their github but in my case I got it from the [AUR](https://aur.archlinux.org/packages?O=0&K=min-ed-launcher).

```sh
yay -S min-ed-launcher-bin
```

Next I've changed the game Launch Options on Steam to launch Elite Dangerous Odyssey expansion using Konsole and [prime-run](https://wiki.archlinux.org/title/PRIME):

```sh
konsole -e prime-run MinEdLauncher %command% /autorun /autoquit /edo
```

You will probably better off following MinEdLauncher [documentation](https://github.com/rfvgyhn/min-ed-launcher#readme) and set it up to your own configuration.

Then launch the game and enjoy.

<figure markdown>
  ![minedlauncher](/assets/blog/minedlauncher/minedlauncher.jpg){ .image loading=lazy }
  <figcaption>Minimal Launcher</figcaption>
</figure>

That's all.

Bye
