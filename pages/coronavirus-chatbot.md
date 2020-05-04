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
<style>
#webchat {
    margin-top: 20px;
}

#webchat button {
    justify-content: left !important;
    text-align: left !important;
    overflow: visible !important;
}

#webchat button div {
    overflow: visible !important;
    white-space: pre-wrap !important;
    text-overflow: unset !important;
}

#webchat button:disabled {
    margin: 0 !important;
    padding: 10px !important;
    min-height: 38px !important;
    background: #d6d7d9 !important;
    color: #ffffff !important;
    border: 0;
}

#webchat[watermark="true"] [role="complementary"] ul[role="list"]::after {
    content: "Powered By ...";
    background: linear-gradient(rgba(248, 248, 248, 0), rgba(248, 248, 248, .63), #F8F8F8 40%);
    bottom: 0;
    right: 0;
    color: #707070;
    display: block;
    font-family: 'Segoe Semibold', Calibri, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    padding: 15px 10px 10px;
    position: sticky;
    text-align: right;
}

#webchat input[type=checkbox] {
    -webkit-appearance: checkbox;
    -moz-appearance: checkbox;
    opacity: 1.0;
    width: auto;
    height: 1.6rem;
    margin-top: 5px !important;
}

/* labels for checkboxes */
#webchat label.ac-textBlock {
    font-size: 16px !important;
    margin-top: 0 !important;
    margin-left: 16px !important;
    text-overflow: unset !important;
    white-space: unset !important;
}

#webchat div.ac-input.ac-choiceSetInput-multiSelect {
    margin-bottom: 15px;
}

#webchat div.ac-input.ac-choiceSetInput-multiSelect > div {
    align-items: flex-start !important;
}

#webchat .ac-input.ac-multichoiceInput.ac-choiceSetInput-compact {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 2.5rem;
}

.webchat__bubble__content {
    border: 0 !important;
    border-radius: 5px !important;
    /* $color-base from design.va.gov */
    color: #212121 !important;
}

/* side vertical container with avatar in it */
.webchat__stackedLayout__avatar {
    margin: 0 8px !important;
}

/* horizontal container with chat bubbles */
.webchat__stacked_indented_content {
    margin: 0 8px !important;
}

/* padding around question chat bubbles */
.css-18q9i6z {
    padding: 16px 8px !important;
}

/* gap between end of scroll area and bg */
.css-1qyo5rb:first-child {
    margin-top: 4px !important;
}

/* padding between question chat bubbles */
.css-1qyo5rb:not(:first-child) {
    padding-bottom: 8px !important;
    margin-bottom: 0 !important;
}

/* padding around answer chat bubbles */
div.ac-container.ac-adaptiveCard {
    padding: 16px 8px !important;
}

/* button style in answers before being selected */
button.ac-pushButton.style-default {
    margin: 0 !important;
    /* $color-primary from design.va.gov */
    color: #0071bb;
    border: 2px solid #0071bb;
    font-weight: 700 !important;
}

button.ac-pushButton.style-default:hover {
    /* $color-primary-darker from design.va.gov */
    color: #003e73;
    border: 2px solid #003e73 !important;
    background: white;
    font-weight: 700 !important;
}

/* additional padding around answer chat bubbles
(3px + webchat__row 5px + css-1qyo5rb 8px = 16px from design specs) */
.webchat__stackedLayout--fromUser {
    padding: 3px 0 !important;
}

/* "just now/5 mins ago" time indicator for each message */
.css-1kceze8 {
    visibility: hidden !important;
    height: 0;
}

/* unnecessary div above answer options in chat bubble */
.ac-horizontal-separator {
    height: 0 !important;
}

/* container around dropdown element */
.ac-input-container {
    flex-wrap: wrap !important;
}

/* dropdown element (ex: states list) */
.ac-input.ac-multichoiceInput.ac-choiceSetInput-compact {
    margin-bottom: 8px !important;
    min-width: 100% !important;
}

.css-yb0hx9.webchat__initialsAvatar.css-10h6e9z {
    font-weight: 700 !important;
    font-size: 18px !important;
    /* $color-primary-darkest from design.va.gov */
    background: #112e51 !important;
}

.css-1t62idy {
    flex-direction: row;
}
</style>
<div class="va-introtext">
  Get answers to your questions about the coronavirus and VA benefits and services below.
</div>


<!--
  The "widget-type" should be registered at
  https://github.com/department-of-veterans-affairs/vets-website/blob/master/src/applications/static-pages/widgetTypes.js>
-->
<div id="webchat" data-widget-type="va-coronavirus-chatbot"></div>
<div class="last-updated usa-content">
          Last updated: <time datetime="2020-04-30">April 30, 2020</time>
</div>
