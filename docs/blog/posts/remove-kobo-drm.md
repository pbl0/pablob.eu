---
description: >
    How to remove DRM from books downloaded on Kobo store

date: 2023-01-14T20:05:00.000Z
categories:
    - Piracy
    - Reading
authors:
    - pablo
comments: true
---

# Remove Kobo DRM

How to remove DRM of books purchased on Kobo store using **[kobo-book-downloader](https://github.com/TnS-hun/kobo-book-downloader)**.

<!-- more -->

<figure markdown>
  ![Post cover](/assets/blog/remove-kobo-drm/cover.png){ .cover .image loading=lazy }
</figure>

1. Clone kobo-book-downloader repo:

```sh
git clone https://github.com/TnS-hun/kobo-book-downloader.git
```

2. Create python virtual environment and activate it:

```sh
python -m venv env
source env/bin/activate
```

3. Install dependencies:

```sh
pip install -r requirements.txt
```

4. Now we can start using kobo-book-downloader, the first time it will ask for your Kobo credentials.
5. This only seems to work if you have a Kobo account that was registered using an email instead of an external login provider (e.g. google, facebook, rakuten). If your account isn't registered with an email you can create a new account and then link it with your original account as explained [here](https://github.com/TnS-hun/kobo-book-downloader/issues/10#issuecomment-536278278).

```sh
python kobo-book-downloader list --all
```

6. After following the initial setup instructions, a list will be shown with the books you've bought.

<figure markdown>
  ![List command](/assets/blog/remove-kobo-drm/list.png){ .image loading=lazy }
  <figcaption>List command</figcaption>
</figure>

7. To download a book run the following command and choose the file(s) to download.

```sh
python kobo-book-downloader pick destination_dir/
```

<figure markdown>
  ![Download command](/assets/blog/remove-kobo-drm/download.png){ .image loading=lazy }
  <figcaption>Download command</figcaption>
</figure>

8.  The end result is a lovely DRM-free `.epub` file ready to be read in any eReader!

9.  kobo-book-downloader also offers other commands. Read more at their [Github readme](https://github.com/TnS-hun/kobo-book-downloader#readme).

> I noticed that on some free books it will fail to download, it usually means that the original file is already DRM-free.

Bye.
