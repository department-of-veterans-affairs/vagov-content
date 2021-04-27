---
# Page setup.
layout: page-breadcrumbs.html
template: detail-page
hidesidenav: true

# The title of the tab.
title: VA coronavirus chatbot
botframework_cdn: https://cdn.botframework.com/botframework-webchat/4.11.0/webchat-es5.js

# This line indicates that this page is not to be built to production (www.va.gov)
vagovprod: true
---
<div class="va-introtext vads-u-margin-bottom--2">
  Get answers to your questions about the coronavirus and VA benefits and services below.
</div>

**Note:** If you don't respond to the chatbot at least once every 60 minutes, you'll need to restart it to ask more questions.

<!--
  The "widget-type" should be registered at
  https://github.com/department-of-veterans-affairs/vets-website/blob/master/src/applications/static-pages/widgetTypes.js>
-->
<div id="webchat" data-widget-type="va-coronavirus-chatbot"></div>
<div class="last-updated usa-content">
  Last updated: <time datetime="2021-04-27">April 27, 2021</time>
</div>
