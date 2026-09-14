# kcc-gem-theme

### A Jekyll theme for KCC websites.

[![Gem Version](https://badge.fury.io/rb/kcc-gem-theme.svg)](https://badge.fury.io/rb/kcc-gem-theme)

---

This theme has all the same node.js/npm, ruby/gem dependencies needed to compile & view it in a browser (just like our website projects). This allows the same dev/production workflow and previewing.

---

<br>

## Install the Gem in a Jekyll Project

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "kcc-gem-theme"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: kcc-gem-theme
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install kcc-gem-theme


---

<br>

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/KankakeeCommunityCollege/kcc-gem-theme>. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

---

<br>

## Installation for Theme Development

To develop the gem theme use these steps.

### Prerequisites

Use the versions specified in the following files:
* `.nvmrc` - use the version of node.js specified here
* `.ruby-version` - use the version of ruby specified here

**Note:** Be sure to use a version of ruby that CloudCannon supports: <https://cloudcannon.com/documentation/developer-articles/pin-your-dependency-version/#ruby>.

### Installation

```bash
git clone git@github.com:KankakeeCommunityCollege/kcc-gem-theme.git
cd kcc-gem-theme
## Install ruby and node deps:
npm i && bundle i
```

---

<br>

## Development

This Gem Theme project is setup just like other KCC projects.

A typical development workflow looks like this:
1. Make any edits in a development build  (`npm run dev` - preview at `localhost:3000`).
2. Create and check the production build (`npm run production` - preview at `localhost:3000`).
3. Commit and push changes (only from a production build) to GitHub
4. When ready to release a new gem version:
   1. Bump the version number in `kcc-gem-theme.gemspec`
   2. Commit and push all updates (including to the `.gemspec` file) to GitHub
   3. **Ensure you have a clean working tree prior to building the gem!** The gem is built from whatever state your local files are in, so any unfinished edits will be built into the gem (`git stash` anything that's not ready to publish and ensure you have a clean working directory using `git status`).
   4. Build the gem (`gem build kcc-gem-theme.gemspec`)
   5. Push the new gem to RubyGems.org (`gem push kcc-gem-theme-x.x.x.gem`)

**Important: _Never publish code from a dev build!_** JS and other assets are compiled differently depending on if a development or production build are run.

1. Run the command below to work on development of the theme and live preview it at http://localhost:3000.

```shell
$ npm run dev

# A convenient alias:
alias npm-d="npm run dev"
```

**Never push code from a development build to GitHub!**

2. Once satisfied with the changes run a production build and look at the preview to make sure everything is ok.

```shell
$ npm run production

# A convenient alias:
alias npm-p="npm run production"
```

You can incrementally push enhancements and other edits to GitHub before you build/release a new gem.

1. (Optional) Make a new version release: Bump the version number in the `kcc-gem-theme.gemspec` file (follow SemVer 2.0 for version number guidelines).

```shell
### Example .gemspec file ###
# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "kcc-gem-theme"
  spec.version       = "0.4.4" # increase the appropriate number following semantic versioning
# ...
### Remainder of .gemspec file omitted. ###
```

4. Push the changes to GitHub.

```shell
git add .
git commit -m "<you commit message>"
git push origin <default-branch>
```

5. Build them gem (ensure you have a clean working tree first).

```shell
$ gem build kcc-gem-theme.gemspec

# should return something like:
Successfully built RubyGem
Name: kcc-gem-theme
Version: 0.4.4
File: kcc-gem-theme-0.4.4.gem
```

**Note:** _Any unstaged changes or works in progress get built into the production gem so be sure to stash anything that shouldn't be included!_

6. Push the resulting gem to RubyGems.

```shell
gem push kcc-gem-theme-0.4.4.gem

# should return something like:
Pushing gem to https://rubygems.org...
Successfully registered gem: kcc-gem-theme (0.4.4)
```

7. Update any projects using the gem theme.

```shell
<username> @ <computername> in ~repositories/kcc-startup-template
$ bundle update kcc-gem-theme
Fetching gem metadata from https://rubygems.org/...........
Fetching gem metadata from https://rubygems.org/.
# ...
```

On your next build of a project using the theme you should see any new changes now.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled. To add a custom directory to your theme-gem, please edit the regexp in `kcc-gem-theme.gemspec` accordingly.

---

<br>

## Dependency Updates

The following is especially true when security patches are released and/or vulnerabilities found:
* **Node.js** should be kept at the LTS version whenever possible.
* **NPM** dependencies should be kept at latest stable versions of packages
* **Ruby** should be kept at the latest versions supported by CloudCannon (<https://cloudcannon.com/documentation/developer-articles/pin-your-dependency-version/#ruby>)
* Gem deps should be kept at the latest compatible versions

GitHub is pretty good at catching npm and gem dep vulnerabilities: <https://github.com/KankakeeCommunityCollege/kcc-gem-theme/security/dependabot>.

You can use the gem development dependency `bundler-audit` (installed via `bundle i` in this project) to check for gem vulnerabilities. Use the following command:

```bash
bundle audit check --update
```

---

<br>

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

---
