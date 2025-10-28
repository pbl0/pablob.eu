---
description: >
    A linux CLI tool to map keyboard hotkeys with the Novation Launchpad device.
date: 2022-08-21T20:40:00.000Z
categories:
    - Linux
    - Tech
authors:
    - pablo
comments: true
---

# Launchpad2KB

A linux CLI tool to map keyboard hotkeys with the Novation Launchpad device.

Read on [Github](https://github.com/pbl0/Launchdpad2KB#readme)

<!-- more -->

<figure markdown>
  ![Post cover](/assets/blog/launchpad2kb/launchpad2kb.webp){  .image loading=lazy }
</figure>

> **Important:** I have only tested this implementation with the first Novation Launchpad, model `NOVLPD01`.

### Usage

Download and unzip from [latest release](https://github.com/pbl0/Launchdpad2KB/releases/latest)

```sh
./launchpad2KB
```

This will ask for the MIDI port, and will default the config file to `config/config.yml`. You can also pass the port number and the config file, as follows:

```sh
./launchpad2KB --port=1 --config=config/config.yml
```

Or

```sh
./launchpad2KB -p 1 -c config/config.yml
```

For some reason sometimes it won't start detecting the device presses. When this happens pressing the `mixer` button on the top-right of your device is enough for it to start working.

### Configuration

The configuration file must be in `.yaml` or `.yml` format.
There is an example config file at [config/config.yml](https://github.com/pbl0/Launchdpad2KB/blob/master/config/config.yml).
For each cell you will require to set it as follows:

Example:

```yaml
- cell: 112
  keys:
      - "ctrl"
      - "shift"
      - "e"
  color: 120
```

This will bind the cell 112 to trigger `CTRL+SHIFT+E` when pressed.

-   `cell` indicates the cell number (see image below).
-   `keys` are the keyboard keys to be pressed. [Keys reference](/assets/blog/launchpad2kb/key_names_reference.json).
-   `color` is a number ranging from 0 to 127.

Example of multiple cells:

```yaml
- cell: 112
  keys:
      - "ctrl"
      - "shift"
      - "e"
  color: 120
- cell: 113
  keys:
      - "ctrl"
      - "shift"
      - "f"
  color: 80
- cell: 113
  keys:
      - "f"
  color: 60
```

### Run from source

-   Create virtual enviroment & install dependencies

```sh
virtualenv env
source env/bin/activate
pìp install -r requirements.txt
```

-   Tkinter is also required:

**Arch linux**

```sh
sudo pacman -S tk
```

**Debian & Ubuntu**

```sh
sudo apt-get install python3-tk
```

**Fedora**

```sh
sudo dnf install python3-tkinter
```

Then run as shown previously replacing `./launchpad2KB` with `python src/main.py`.

Haven't tested it on Windows/MacOS.

---

### Cells

<figure markdown>
  ![cells image](/assets/blog/launchpad2kb/cells.webp){ .image loading=lazy }
</figure>
