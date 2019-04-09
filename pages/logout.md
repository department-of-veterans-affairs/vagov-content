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
  window.sessionStorage.removeItem('authReturnUrl');
  window.localStorage.removeItem('hasSession');
  window.localStorage.removeItem('userFirstName');
  window.location = '/';
</script>
