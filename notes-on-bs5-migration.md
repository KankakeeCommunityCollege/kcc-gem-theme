# Notes on Bootstrap 5 Migration

-----

Notes on specific BS utilities, classes, components, JS, and other items that we use which have changed in Bootstrap 5.

## Grid System

BS5 introduces a new `xxl` breakpoint at viewports with an innerWidth ≥ 1400px.
At this breakpoint, `.container` is allowed a max width of 1320px. To avoid layout
issues, this can be overridden to match BS4 using the following default variable override.

```scss
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1140px
);
```

Note: the above variable override will cause a _warning_ when compiling with Webpack.
This warning is simply a test built into Bootstrap 5 and can safely be ignored.
Using the `--stats-children` flag with Webpack will show the following:
```
Invalid value for $container-max-widths: This map must be in ascending order, but key 'xxl' has value 1140px which isn't greater than 1140px, the value of the previous key 'xl' !
```

## Classes

* classes, mixins, utilities using `left` and `right` are now `start` and `end`.
  * E.g.: `.pl-3` is now `.ps-3` and `.mr-2` is now `.me-2`
  * Renamed `.float-left` and `.float-right` to `.float-start` and `.float-end`.
  * Renamed `.text-*-left` and `.text-*-right` to `.text-*-start` and `.text-*-end`.
* Screen reader classes like `.sr-only` are now `.visually-hidden`.
* `.text-muted` is now `.text-body-secondary`
* `.close` is now `.btn-close`
* Accordions no longer use `.card` classes

Regular Expression to find deprecated BS4 classes that we've used:
```javascript
const deprecatedClassRegExp = /([pm][lr](?:-(?:sm|md|lg|xl))?-[0-5]|(?:text|float)(?:-(?:sm|md|lg|xl))?-(?:left|right)|sr-only|text-muted|close)/g;
```

## Dropdowns

Dropdown menus now use Popperjs which changes things a little from BS4.

_Dropdown menus now have a `data-bs-popper="static"` attribute set when the positioning of the dropdown is static, or dropdown is in the navbar. This is added by our JavaScript and helps us use custom position styles without interfering with Popper’s positioning._

**Note:** I had to do a style override to prevent our mega-menu's dropdown menu from sticking to the left side of the viewport when clicked open.

## JS

*Data attributes for all JavaScript plugins are now namespaced to help distinguish Bootstrap functionality from third parties and your own code. For example, we use `data-bs-toggle` instead of `data-toggle`.*

## Responsive Font Sizing

RFS is now enabled by default. This feature was previously opt-in with v4.

We may want to consider ditching our custom heading classes and their custom font-size rules
in favor of utilizing RFS and reducing CSS file sizes.

## Switch from CDN to `node_modules`

To reduce style overrides and unused JS/CSS the Bootstrap 5 NPM package should be used instead of CDN links.
This allows us to only import the styles we use and dynamically import JS as needed.

We should consider customizing BS5 and eliminating the excessive amount of custom style rules
and style overrides to reduce asset sizes.
For example, instead of using `.typography__h2` we should customize the BS5 h2 style rules; this would also simplify our CloudCannon customizations.

## Audit site for deprecated BS4 items

To look for deprecated BS4 classes in a project run `node look-for-deprecated-bs4-classes.mjs` and then manually check any files that are logged to the console from running the script.

To look for JS that may need to be updated run `node look-for-deprecated-bs4-js.mjs` and then manually check any files logged to the console:
* Use of jQuery is usually a good indicator (e.g. `$(...)`) of BS4 methods, however, slick slider uses jQuery too.
* Data-attributes may also require updating. BS4 `data-<attr>` have been updated to `data-bs-<attr>`
