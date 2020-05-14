---
# Page setup.
layout: page-breadcrumbs.html
template: detail-page
hidesidenav: true

# The title of the tab.
title: VA coronavirus chatbot
botframework_cdn: https://cdn.botframework.com/botframework-webchat/4.8.1/webchat-es5.gzip.js

# This line indicates that this page is not to be built to production (www.va.gov)
vagovprod: true
---
<link data-entry-name="chatbot">
<div class="va-introtext">
  Get answers to your questions about the coronavirus and VA benefits and services below.
</div>


<!--
  The "widget-type" should be registered at
  https://github.com/department-of-veterans-affairs/vets-website/blob/master/src/applications/static-pages/widgetTypes.js>
-->
<div id="webchat" data-widget-type="va-coronavirus-chatbot"></div>
<div class="last-updated usa-content">
          Last updated: <time datetime="2020-05-06">May 6, 2020</time>
</div>
