---
description: >
    Almost a year ago, I forked a Minecraft plugin that connects the chat between my Minecraft server and my Telegram group...

date: 2025-10-18T12:14:00.000Z
categories:
    - Minecraft
authors:
    - pablo
comments: true
---

# PaperTelegramBridge

Almost a year ago, I forked a Minecraft plugin that connects the chat between my Minecraft server and my Telegram group (because I'm a Discord hater).

The plugin in question is [spigot-tg-bridge](https://github.com/kraftwerk28/spigot-tg-bridge) and, despite not being updated for a couple of years, it still works perfectly. Nevertheless, my goal was to add more functionalities to give my server a bit of personality.

<!-- more -->
<figure markdown>
  ![Usage](/assets/blog/paper-telegram-bridge/usage.png){ .cover .image loading=lazy }
  <figcaption>Usage example</figcaption>
</figure>

The original plugin was in Kotlin, which I like, and distributed under **GPL-3.0**, which I of course maintain.

The plugin has reached a phase where I'm quite satisfied with it and find it very useful for my Minecraft server, so I finally decided to share it here.

## Features

-   Sends messages from Minecraft chat to your Telegram group and vice versa.
-   Announces joins, leaves, deaths, advancements, etc.
-   Share a screenshot of your inventory from the game by sending `[inv]`. You can also share information about the `[item]` you're holding and even share books and your `[ender]` chest.

<figure markdown>
  ![Share books](/assets/blog/paper-telegram-bridge/book.png){ .cover .image loading=lazy }
</figure>

-   `silentjoinleave` permission to disable tracking for certain players, useful if you use any vanish plugin.
-   Whitelist management from Telegram with `/whitelist`. (Admin only).

<figure markdown>
  ![Whitelist example](/assets/blog/paper-telegram-bridge/whitelist.png){ .cover .image loading=lazy }
</figure>

-   Configurable commands: `/online`, `/time`.

If you're interested in using it for your server, you can download it from [Modrinth](http://modrinth.com/plugin/paper-telegram-bridge). I encourage you to read the complete [Readme](https://github.com/pbl0/paper-telegram-bridge#readme) and open an issue if you find any bugs. Keep in mind that this is my first Minecraft plugin and I'm still learning.
