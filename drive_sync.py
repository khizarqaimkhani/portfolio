"""Reads the public Google Drive portfolio folder and writes drive.json + poster images.

Runs inside GitHub Actions (see .github/workflows/drive-sync.yml). No API key needed:
the folder is shared as "Anyone with the link", so its public listing page is enough.
"""
import datetime as dt
import html
import json
import os
import re
import struct
import urllib.request

FOLDER_ID = os.environ.get("DRIVE_FOLDER_ID", "1f59ZPGWwmH0gVUBg6hEENthW0sld02fu")
SITE_URL = os.environ.get("SITE_URL", "").rstrip("/")
VIDEO_EXT = (".mp4", ".mov", ".m4v", ".webm", ".mkv", ".avi")
UA = {"User-Agent": "Mozilla/5.0 (portfolio-sync)"}
POSTER_DIR = os.path.join("img", "auto")


def get(url, timeout=30):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def image_size(data):
    """Width/height of a JPEG or PNG without extra libraries."""
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", data[16:24])
    if data[:2] == b"\xff\xd8":
        i = 2
        while i < len(data) - 9:
            if data[i] != 0xFF:
                i += 1
                continue
            marker = data[i + 1]
            if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                h, w = struct.unpack(">HH", data[i + 5:i + 9])
                return w, h
            seg = struct.unpack(">H", data[i + 2:i + 4])[0]
            i += 2 + seg
    return None


def clean_title(name):
    base = re.sub(r"\.[^.]+$", "", name)
    base = re.sub(r"[_]+", " ", base).strip()
    if re.match(r"(?i)^(whatsapp video|vid[-_ ]?\d|img[-_ ]?\d|\d+$)", base) or not base:
        return "New project"
    return base


def main():
    now = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    previous = {}
    if SITE_URL:
        try:
            old = json.loads(get(SITE_URL + "/drive.json", timeout=15))
            previous = {f["id"]: f for f in old.get("files", [])}
        except Exception as e:  # first run, or site not reachable
            print("No previous drive.json:", e)

    try:
        page = get(f"https://drive.google.com/embeddedfolderview?id={FOLDER_ID}").decode("utf-8", "replace")
    except Exception as e:
        print("Could not read the Drive folder:", e)
        json.dump({"ok": False, "updated": now, "files": []}, open("drive.json", "w"))
        return

    entries = re.findall(r'id="entry-([A-Za-z0-9_-]+)".*?class="flip-entry-title">([^<]+)<', page, flags=re.S)
    os.makedirs(POSTER_DIR, exist_ok=True)
    files = []
    for fid, raw_name in entries:
        name = html.unescape(raw_name).strip()
        if not name.lower().endswith(VIDEO_EXT):
            continue
        prev = previous.get(fid, {})
        item = {
            "id": fid,
            "name": name,
            "title": clean_title(name),
            "format": prev.get("format", "9:16"),
            "first_seen": prev.get("first_seen", now),
            "poster": "",
        }
        try:
            data = get(f"https://drive.google.com/thumbnail?id={fid}&sz=w800")
            size = image_size(data)
            if size:
                w, h = size
                item["format"] = "16:9" if w > h else "9:16"
                path = os.path.join(POSTER_DIR, fid + ".jpg")
                open(path, "wb").write(data)
                item["poster"] = path.replace(os.sep, "/")
        except Exception as e:
            print("No thumbnail for", name, e)
        files.append(item)

    json.dump({"ok": bool(files), "updated": now, "files": files}, open("drive.json", "w"), indent=1)
    print(f"Found {len(files)} videos in the Drive folder.")


if __name__ == "__main__":
    main()
