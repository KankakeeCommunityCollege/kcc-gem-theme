# kcc-gem-theme

### A Jekyll theme for new KCC sites.

[![Gem Version](https://badge.fury.io/rb/kcc-gem-theme.svg)](https://badge.fury.io/rb/kcc-gem-theme)

---

This theme's GitHub repo has all the Gulp, npm, & Webpack dependancies included to compile & view it in a browser, just like our new sites, for convenient development and previewing of changes.

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

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/hello. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

---

<br>

## Development

This Gem Theme project is setup just like other KCC projects. You can run `$ npm run dev`, `$ npm run production`, `$ npx webpack`, or `$ gulp`.

1. Run the command below to work on development of the theme and live preview it at http://localhost:3000.

```shell
$ npm run dev

# A convenient alias:
alias npm-d="npm run dev"
```

2. Once satisfied with the changes run a production build and look at the preview to make sure everything is ok.

```shell
$ npm run production

# A convenient alias:
alias npm-p="npm run production"
```

3. (Optional) Make a new version release: Up the version in the kcc-gem-theme.gemspec file.

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
git push origin master
```

5. Build them gem.

```shell
$ gem build kcc-gem-theme.gemspec

# should return something like:
Successfully built RubyGem
Name: kcc-gem-theme
Version: 0.4.4
File: kcc-gem-theme-0.4.4.gem
```

6. Push the resulting gem to RubyGems.

```shell
gem push kcc-gem-theme-0.4.4.gem

# should return something like:
Pushing gem to https://rubygems.org...
Successfully registered gem: kcc-gem-theme (0.4.4)
```

7. Update projects using the gem.

```shell
<username> @ <computername> in ~repositories/kcc-startup-template
$ bundle update
Fetching gem metadata from https://rubygems.org/...........
Fetching gem metadata from https://rubygems.org/.
# ...
```

On your next build you should see any new changes to gem theme.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `kcc-gem-theme.gemspec` accordingly.

---

<br>

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

---
