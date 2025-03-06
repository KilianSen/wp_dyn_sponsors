# wp_dyn_sponsors

A niche custom html blob made for a specific WordPress site.
Its used to display a list of sponsors with a hover effect,
that reveals a link to the sponsors website and what team they sponsor.

### ! THIS PROJECT WAS CANCELLED BEFORE COMPLETION !
Most features were implemented, but the project was never fully completed.
I neither recommend using this code, nor working on it further.
The code is a mess and its a solution to a problem that can be solved in a much better ways.
Please refrain from using this code unless you really know what you are doing.

## Usage
1. Clone the repository to your local machine.
2. Navigate to the cloned directory.
3. Run `npm install` to install the required dependencies.
4. Run `npm run publish` to build the project.
5. Copy the contents of the `build\bundle.html` into your WordPress Custom HTML block.
6. Create a Code Block in WordPress and paste your configuration into it. (See below for an example)
7. Set the Code Block to be hidden.
8. Save the page.

From now on you can edit the configuration in the Code Block and it will update the sponsors on the page.

## Configuration
See [example](https://raw.githubusercontent.com/KilianSen/wp_dyn_sponsors/refs/heads/master/example_config.json) (outdated)

## Project Reflections
This project was a real learning experience for me.
The key was that I only got access to the WordPress site as an editor.
Therefore I had to find a way to implement the feature without access to the themes or plugins.
I ended up using a custom HTML block and a code block to implement a fully custom/dynamic solution.

#### Why was this project cancelled?
The sponsor display should be updated to specifications that wp could not provide.
The team was still investigating different solutions, while this POC was developed.

#### Why did I use base64 encoding?
For some reason the custom HTML block in WordPress sometimes messes up escaping (e.g. `&` becomes `&amp;`).
Which causes the JS to be invalid.
I ended up using base64 encoding, since its resilient to this issue.

#### Why the complex type system?
TBH, mostly because I wanted to try it out.
The specification was quite lacking, so I wanted to make sure its easy to extend.
I've ran into some stupid issues with the type system, but overall it was a good experience.

#### Why the complex build system?
WordPress is a pain to work with.
I wanted all the payload to be in a single clipboard, from the HTML, CSS and JS.

#### Why react?
JSX makes it easy to work with dynamic HTML.

#### Why tailwind?
Easy styling.