---
layout: page.html
title: Logout
private: true
---

<div class="main home" role="main">
  <div class="section main-menu">
    <div class="row">
      <div class="small-12 columns">
        <div class="csp-inline-patch-logout">
        <h3>Signing out of VA.gov...</h3>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // Minified isMobile.
  !function(e){var n=/iPhone/i,t=/iPod/i,r=/iPad/i,a=/\bAndroid(?:.+)Mobile\b/i,p=/Android/i,l=/\bAndroid(?:.+)SD4930UR\b/i,b=/\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,f=/Windows Phone/i,u=/\bWindows(?:.+)ARM\b/i,c=/BlackBerry/i,s=/BB10/i,v=/Opera Mini/i,h=/\b(CriOS|Chrome)(?:.+)Mobile/i,w=/\Mobile(?:.+)Firefox\b/i;function m(e,i){return e.test(i)}function i(e){var i=e||("undefined"!=typeof navigator?navigator.userAgent:""),o=i.split("[FBAN");void 0!==o[1]&&(i=o[0]),void 0!==(o=i.split("Twitter"))[1]&&(i=o[0]);var d={apple:{phone:m(n,i),ipod:m(t,i),tablet:!m(n,i)&&m(r,i),device:m(n,i)||m(t,i)||m(r,i)},amazon:{phone:m(l,i),tablet:!m(l,i)&&m(b,i),device:m(l,i)||m(b,i)},android:{phone:m(l,i)||m(a,i),tablet:!m(l,i)&&!m(a,i)&&(m(b,i)||m(p,i)),device:m(l,i)||m(b,i)||m(a,i)||m(p,i)},windows:{phone:m(f,i),tablet:m(u,i),device:m(f,i)||m(u,i)},other:{blackberry:m(c,i),blackberry10:m(s,i),opera:m(v,i),firefox:m(w,i),chrome:m(h,i),device:m(c,i)||m(s,i)||m(v,i)||m(w,i)||m(h,i)}};return d.any=d.apple.device||d.android.device||d.windows.device||d.other.device,d.phone=d.apple.phone||d.android.phone||d.windows.phone,d.tablet=d.apple.tablet||d.android.tablet||d.windows.tablet,d}"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=i:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=i():"function"==typeof define&&define.amd?define([],e.isMobile=i()):e.isMobile=i()}(this);

  window.sessionStorage.removeItem('authReturnUrl');
  window.localStorage.removeItem('hasSession');
  window.localStorage.removeItem('userFirstName');

  var isFullScreenLoginEnabled = isMobile.any || window.localStorage.getItem('enableFullScreenLogin');
  if (isFullScreenLoginEnabled) {
    window.location = '/';
  } else {
    window.opener.location = '/';
    window.close();
  }
</script>
