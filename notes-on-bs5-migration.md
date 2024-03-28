# Notes on Bootstrap 5 Migration

-----

Notes on specific BS utilities, classes, components, JS, and other items that we use which have changed in Bootstrap 5.

## Classes

* classes, mixins, utilities using `left` and `right` are now `start` and `end`.
  * E.g.: `.pl-3` is now `.ps-3` and `.mr-2` is now `.me-2`
  * Renamed `.float-left` and `.float-right` to `.float-start` and `.float-end`.
  * Renamed `.text-*-left` and `.text-*-right` to `.text-*-start` and `.text-*-end`.
* Screen reader classes like `.sr-only` are now `.visually-hidden`.
* `.text-muted` is now `.text-body-secondary`
* `.close` is now `.btn-close`
* Accordions no longer use `.card` classes

## Dropdowns

Dropdown menus now have a data-bs-popper="static" attribute set when the positioning of the dropdown is static, or dropdown is in the navbar. This is added by our JavaScript and helps us use custom position styles without interfering with Popper’s positioning.

## JS

Data attributes for all JavaScript plugins are now namespaced to help distinguish Bootstrap functionality from third parties and your own code. For example, we use data-bs-toggle instead of data-toggle.

## Responsive Font Sizing

RFS is now enabled by default. This feature was previously opt-in with v4.

We may want to consider ditching our custom heading classes and their custom font-size rules
in favor of utilizing RFS and reducing CSS file sizes.

## Switch from CDN to `node_modules`

To reduce style overrides and unused JS/CSS the Bootstrap 5 NPM package should be used.
This allows us to only import he items we use and dynamically import JS when needed.

We should consider customizing BS5 and eliminating the excessive amount of custom style rules
and style overrides to reduce asset sizes.
For example, instead of using `.typography__h2` we should customize the BS5 h2 style rules.
