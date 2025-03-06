import os
import base64

def get_files_by_ext(path, ext, op=None) -> dict[str, str]:
    contents = {}
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(ext):
                with open(os.path.join(root, file), 'r') as f:
                    raw = f.read()
                    if op:
                        raw = op(raw)
                    contents[file] = raw
    return contents

def tag(tag: str, content: str, nl=False) -> str:
    return f"<{tag}>{'\n' if nl else ''}" + content + f"{'\n' if nl else ''}</{tag}>"

if __name__ == "__main__":
    try:
        html = get_files_by_ext('src', '.html', lambda x: ''.join([k.strip() for k in x.split('\n')]))
        css = get_files_by_ext('build', '.css')
        js = get_files_by_ext('build', '.js')
    except Exception as e:
        print("Could not gather bundle files!",e)
        exit(1)

    try:
        with open('build/bundle.html', 'w') as f:
            for name, content in html.items():
                f.write(tag("div", content))

            for name, content in css.items():
                f.write(tag("style", content))

            for name, content in js.items():
                f.write(f'<script type="text/javascript" src="data:text/javascript;base64,{base64.b64encode(content.encode()).decode()}"></script>')
    except Exception as e:
        print("An error occurred during bundling, abort!",e)
        exit(1)

    try:
        for name, _ in js.items():
            if os.path.exists(os.path.join('build', name)):
                os.remove(os.path.join('build', name))
    except Exception as e:
        print("An error occurred during cleanup",e)

    print("bundle complete")
    exit(0)