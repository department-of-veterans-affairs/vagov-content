---
# Page setup.
layout: page-breadcrumbs.html
template: detail-page

# The title of the tab.
title: Decision Support Tool Demo

# The <h1> visible on the page
display_title: Decision Support Tool Demo

# This line indicates that this page is not to be built to production (www.va.gov)
vagovprod: false
---

<div class="va-introtext">
Demo page for the decision support tool. 
</div>

<form id="address_form">
    <label>Street Address:</label><input type="text" name="street"/>
    <br/>
    <label>City:</label><input type="text" name="city"/>
    <br/>
    <label>State:</label><input type="text" name="state"/>
    <br/>
    <label>Zip:</label><input type="text" name="zip_code"/>
    <br/>
    <input type="submit" value="submit" />
</form>

<script src="https://staging-va-gov-assets.s3-us-gov-west-1.amazonaws.com/js/jquery-1.12.0.min.js"></script>
<script type="text/javascript">
$('#address_form').submit(function(e) {
    e.preventDefault();
    var data = {};
    var Form = this;
    $.each(this.elements, function(i, v) {
        var input = $(v);
        data[input.attr("name")] = input.val();
        delete data["undefined"];
    });
    $.ajax({
        type: 'POST',
        url: 'https://veteligibilitystatus.com',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        context: Form,
        success: function(callback) {
            console.log(callback);
            $(this).text('Address input was ' + callback.street + ' ' + callback.city + ' ' + callback.state + ' ' + callback.zip_code + '!');
        },
        error: function() {
            $(this).html("error!");
        }
    });
});
</script>
