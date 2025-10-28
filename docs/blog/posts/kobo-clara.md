---
description: >
    For some time I've been trying to recover the habit of reading. For some reason I thought that the best way of accomplishing that was to buy an eReader device.

date: 2022-08-13T11:48:00.000Z
categories:
    - Tech
    - Reading
authors:
    - pablo
comments: true
---

# My Kobo eReader

???+ info "Update 18/01/2024"

    I have since switched to a Clara 2E which is pretty much the same device with the only changes being the addition of water resistance and the replacement of the previous Micro USB charging port by a much sexier USB-C port.

For some time I've been trying to recover the habit of reading and for some reason I thought that the best way to accomplish that was to buy an eReader device.

So, last year I've got myself a fairly cheap refurbished [Kobo Clara HD](https://gl.kobobooks.com/products/kobo-clara-hd) from Ali Express. The experience has been very pleasant overall and I definitely read more now.

<!-- more -->

<figure markdown>
  ![Post cover](/assets/blog/kobo-clara/reader.webp){  .image loading=lazy }
</figure>

## Why not Kindle?

Because Kobo devices are capable to read `.epub` files, while kindle are limited to their **proprietary** format.

???+ info "Update 22/12/2023"

    I have recently learned that Kindle now supports EPUB files (kinda).

## Mods and Apps

When it arrived I didn't know it had such a great modding community and funnily enough my device already came with **koreader** and **nickelmenu** pre-installed. I will now explain what these tools are and list all the hacks/modifications I've tried for this device.

<figure markdown>
  ![Kobo main menu](/assets/blog/kobo-clara/menu.webp){ .image loading=lazy }
  <figcaption>Kobo main menu</figcaption>
</figure>

### Koreader & Plato

These two are alternative reader apps. [Koreader](https://koreader.rocks/) has an horrendous UI but has many advanced features. [Plato](https://github.com/baskerville/plato) on the other hand, it's much prettier and user friendly. In the end I preferred using the default reader most of the time, although the previous two seem to be better for PDF reading which is something I seldom do.

### Nickelmenu

<figure markdown>
  ![Nickelmenu](/assets/blog/kobo-clara/nickelmenu.webp){ .image loading=lazy }
  <figcaption>Nickelmenu</figcaption>
</figure>

[Nickelmenu](https://pgaskin.net/NickelMenu/) allows to add new entries to the many different menus such as start a ftp server, open the web browser, import new books, run apps, etc. Requires a bit of manual configuration but it was easy enough.

### Kepubify

Soon I've realized that the books downloaded from the Kobo store worked better on the default reader than the ones from other sources. I've luckily came across with [kepubify](https://pgaskin.net/kepubify/) which converts the .epub files to the .kepub format used by Kobo for that matter. Kepubify has both a CLI app and a [web app](https://pgaskin.net/kepubify/try/).

### Calibre-Web

<figure markdown>
  ![Calibre web screenshot](/assets/blog/kobo-clara/calibre-web.webp){ .image loading=lazy }
  <figcaption>Calibre web</figcaption>
</figure>

This one really surprised me. [Calibre-Web](https://github.com/janeczku/calibre-web) it's a self-hosted web app that I run on my [Raspberry Pi server](/posts/home-server-tour). My original idea was accessing it through the built-in browser but that didn't work at all for me. By reading on their github wiki I've found out that Calibre-Web has an amazing [Kobo sync integration](https://github.com/janeczku/calibre-web/wiki/Kobo-Integration).

It manages to connect the device to calibre web tricking it to believe that it's querying the official Kobo servers. It syncs all my books and auto-converts them with Kepubify.

???+ info "Update 28/10/2025"

    I now use [Calibre-web-automated](https://github.com/crocodilestick/Calibre-Web-Automated) fork of Calibre-web. It comes with some added features such as importing files automatically when placed in a given directory and a improved UI for metadata fetching.

### Books

Either buy books from Kobo store directly o buy books without DRM. You can also [learn how to remove DRM from kobo's books](/posts/remove-kobo-drm). A great source for **free books** is [Anna's Archive](https://annas-archive.org/).
