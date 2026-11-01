import glob
import re
import os

wishes_dir = "src/data/wishes"
all_ids = []

for filepath in sorted(glob.glob(os.path.join(wishes_dir, "*.ts"))):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
    all_ids.extend(ids)
    print(f"{filename}: {len(ids)} wishes, first={ids[0]}, last={ids[-1]}")

print(f"\nTotal existing wishes: {len(all_ids)}")
print(f"Total unique IDs: {len(set(all_ids))}")

