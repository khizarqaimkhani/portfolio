# Muhammad Khizar — Video Portfolio

Live website: https://khizarqaimkhani.github.io/portfolio

## Nayi video kaise add karein
1. Video Google Drive ke **Portfolio** folder mein upload karein.
2. File ka naam acha rakhein, jaise `Nike Shoes Ad.mp4`. Yahi naam website pe title banega.
3. Bas. Takreeban 3 ghante ke andar video website ke "All videos" page aur home page pe khud aa jayegi.

Jaldi chahiye? GitHub pe is repo mein **Actions → "Update videos from Google Drive" → Run workflow** dabayein. 2-3 minute mein website update ho jayegi.

Drive se video delete karein to website se bhi hat jayegi.

## Ye kaise chalta hai
- `.github/workflows/drive-sync.yml` har 3 ghante chalta hai.
- `drive_sync.py` Drive folder ki public list parhta hai (koi API key nahi chahiye) aur `drive.json` aur thumbnails banata hai.
- Website `drive.json` se nayi videos dikhati hai. Drive folder ki sharing **"Anyone with the link"** rehni chahiye.

## Kisi video ka title ya category badalna (optional)
`videos.js` mein us video ka block add ya edit karein. `drive` mein Drive link ka ID daalein
(`drive.google.com/file/d/`**`YEH_ID`**`/view`). Jo videos `videos.js` mein nahi, wo "More Work" category mein aati hain.
