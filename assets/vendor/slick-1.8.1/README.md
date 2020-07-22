# THESE FILES ARE FROM THE OFFICIAL "SLICK" IMAGE-SLIDER PROJECT (BY KEN WHEELER)...

[Github repo](https://github.com/kenwheeler/slick/)
[Website](http://kenwheeler.github.io/slick/)

---

## ALL NON-ESSENIAL FILES (E.G. BOWER.JSON, PACKAGE.JSON, OTHER PROJECT/CONFIG FILES ) HAVE BEEN REMOVED

---

**The `./slick.LICENSE.txt` file is the original from Ken Wheeler's slick project (renamed from `./LICENSE`)**

**Slick's original `README.markdown` file has been renamed as `./slick.README.markdown`.**

**To compile slick's production/dist styling into the main theme stylesheet, the follwoing happened:**

1. `slick.css` was renamed to `slick.scss`
2. `slick-theme.css` to `slick-theme.scss`
3. `@import '...';` statements where added to the main SCSS file
4. `url('<PATH_VALUES>')` <PATH_VALUES> starting dictory was changed from `./` to `../vendor/slick-1.8.1/slick/` (since the final minified/compiled-stylesheet is hosted from `/assets/css/` )



