---
# Page setup.
layout: page-breadcrumbs.html
template: detail-page

# The title of the tab.
title: Focus testing

# The <h1> visible on the page
display_title: Mock page for testing focus styles

# This line indicates that this page is not to be built to production (www.va.gov)
vagovprod: false
private: true
---

<link rel="stylesheet" href="https://unpkg.com/@department-of-veterans-affairs/formation@8.0.0/dist/formation.min.css">
<div class="va-introtext" id="introtext">
Used for testing new focus styles
</div>

<va-loading-indicator></va-loading-indicator>

<va-text-input label="test" name="test"></va-text-input>
