import os
import re

TARGET_DIR = r"c:\Users\Owner\OneDrive\Documents\SmartSort\src"

REPLACEMENTS = [
    # Backgrounds
    (r"bg-\[\#0b1c30\]", "bg-card"),
    (r"bg-\[\#071321\]", "bg-background"),
    (r"bg-\[\#f8fafc\]", "bg-background"),
    (r"bg-\[\#0f2942\]", "bg-secondary"),
    (r"bg-\[\#1a365d\]", "bg-muted"),
    (r"bg-\[\#f1f5f9\]", "bg-muted"),
    (r"bg-white dark:bg-card", "bg-card"),
    (r"bg-white dark:bg-\[\#0b1c30\]", "bg-card"),
    (r"bg-slate-50 dark:bg-\[\#0b1c30\]", "bg-background"),
    (r"bg-slate-50 dark:bg-\[\#071321\]", "bg-background"),
    # Borders
    (r"border-\[\#1e3a5f\]", "border-border"),
    (r"border-\[\#e2e8f0\]", "border-border"),
    (r"border-slate-200/50 dark:border-\[\#1e3a5f\]/50", "border-border/50"),
    (r"border-slate-200 dark:border-\[\#1e3a5f\]", "border-border"),
    (r"border-\[\#e2e8f0\]/60 dark:border-\[\#1e3a5f\]/40", "border-border/50"),
    (r"border-slate-100 dark:border-\[\#1e3a5f\]/20", "border-border/20"),
    # Text
    (r"text-\[\#cbd5e1\]", "text-muted-foreground"),
    (r"text-\[\#515f74\]", "text-muted-foreground"),
    (r"text-\[\#94a3b8\]", "text-muted-foreground"),
    (r"text-\[\#64748b\]", "text-muted-foreground"),
    (r"text-\[\#475569\]", "text-muted-foreground"),
    (r"text-\[\#0b1c30\]", "text-foreground"),
    (r"text-slate-800 dark:text-white", "text-foreground"),
    (r"text-\[\#0f172a\] dark:text-white", "text-foreground"),
    (r"text-\[\#0b1c30\] dark:text-white", "text-foreground"),
]


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    for pattern, replacement in REPLACEMENTS:
        # Simple regex replacement
        new_content = re.sub(pattern, replacement, new_content)

    # Optional: cleanup redundant classes like 'bg-card dark:bg-card' -> 'bg-card'
    new_content = re.sub(r"bg-card dark:bg-card", "bg-card", new_content)
    new_content = re.sub(
        r"bg-background dark:bg-background", "bg-background", new_content
    )
    new_content = re.sub(
        r"border-border dark:border-border", "border-border", new_content
    )
    new_content = re.sub(
        r"text-foreground dark:text-foreground", "text-foreground", new_content
    )
    new_content = re.sub(
        r"text-muted-foreground dark:text-muted-foreground",
        "text-muted-foreground",
        new_content,
    )

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {filepath}")


for root, dirs, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith((".tsx", ".jsx", ".ts", ".js")):
            process_file(os.path.join(root, file))

print("Done patching colors.")
