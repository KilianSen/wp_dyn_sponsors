import os

def get_files_by_ext(path, ext) -> {str: str}:
    contents = {}
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(ext):
                with open(os.path.join(root, file), 'r') as f:
                    contents[file] = f.read()
    return contents

def tag(tag, content):
    return f"<{tag}>\n{content}\n</{tag}>"

if __name__ == "__main__":
    try:
        html = get_files_by_ext('src', '.html')
        css = get_files_by_ext('src', '.css')
        js = get_files_by_ext('build', '.js')
    except Exception as e:
        print("Could not gather bundle files!",e)
        exit(1)

    try:
        with open('build/bundle.html', 'w') as f:
            for name, content in html.items():
                f.write(tag("div", content))
                f.write("\n")


            for name, content in css.items():
                f.write(tag("style", content))
                f.write("\n")

            for name, content in js.items():
                f.write(tag("script", content))
                f.write("\n")
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