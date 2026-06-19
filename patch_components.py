import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'fetch(' not in content or 'authFetch' in content:
        return

    # Count depth for import path
    # filepath is like src\pages\Dashboard\Dashboard.tsx
    # We want to find the relative path from the current file to src/lib/authFetch
    normalized_path = filepath.replace('\\', '/')
    parts = normalized_path.split('src/')
    if len(parts) < 2: return
    
    sub_path = parts[1] # e.g. pages/Dashboard/Dashboard.tsx
    depth = sub_path.count('/')
    import_path = '../' * depth + 'lib/authFetch'

    import_stmt = f'import {{ authFetch }} from "{import_path}";\n'
    content = import_stmt + content
    
    content = re.sub(r'\bfetch\(', 'authFetch(', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Patched {filepath}")

def walk_dir(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    walk_dir('src/pages')
    walk_dir('src/hooks')
