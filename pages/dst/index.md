---
# Page setup.
layout: page-breadcrumbs.html
template: detail-page

# The title of the tab.
title: Decision Support Tool Demo

# The <h1> visible on the page
display_title: Veterans Community Care Program Eligibility Tool

# This line indicates that this page is not to be built to production (www.va.gov)
vagovprod: false
---

<div class="va-introtext">
Demo page for the decision support tool. 
</div>
<div id="loading" style="display:none">
	Loading...
	<!-- put VA loading gif here -->
</div>
<form id="address_form" name="address_form">
<label>Street Address:</label><input type="text" name="street" required autocomplete="address-line1" /><br />
<label>City:</label><input type="text" name="city" required autocomplete="address-level2" /><br />
<label>State:</label><select name="state" required autocomplete="address-level1" >
<option value="AL">
AL
</option>

<option value="AK">
AK
</option>

<option value="AR">
AR
</option>

<option value="AS">
AS
</option>

<option value="AZ">
AZ
</option>

<option value="CA">
CA
</option>

<option value="CO">
CO
</option>

<option value="CT">
CT
</option>

<option value="DC">
DC
</option>

<option value="DE">
DE
</option>

<option value="FL">
FL
</option>

<option value="GA">
GA
</option>

<option value="GU">
GU
</option>

<option value="HI">
HI
</option>

<option value="IA">
IA
</option>

<option value="ID">
ID
</option>

<option value="IL">
IL
</option>

<option value="IN">
IN
</option>

<option value="KS">
KS
</option>

<option value="KY">
KY
</option>

<option value="LA">
LA
</option>

<option value="MA">
MA
</option>

<option value="MD">
MD
</option>

<option value="ME">
ME
</option>

<option value="MI">
MI
</option>

<option value="MN">
MN
</option>

<option value="MO">
MO
</option>

<option value="MP">
MP
</option>

<option value="MS">
MS
</option>

<option value="MT">
MT
</option>

<option value="NC">
NC
</option>

<option value="NE">
NE
</option>

<option value="NH">
NH
</option>

<option value="NJ">
NJ
</option>

<option value="NM">
NM
</option>

<option value="NV">
NV
</option>

<option value="NY">
NY
</option>

<option value="ND">
ND
</option>

<option value="OH">
OH
</option>

<option value="OK">
OK
</option>

<option value="OR">
OR
</option>

<option value="PA">
PA
</option>

<option value="PR">
PR
</option>

<option value="RI">
RI
</option>

<option value="SC">
SC
</option>

<option value="SD">
SD
</option>

<option value="TN">
TN
</option>

<option value="TX">
TX
</option>

<option value="UM">
UM
</option>

<option value="UT">
UT
</option>

<option value="VT">
VT
</option>

<option value="VA">
VA
</option>

<option value="VI">
VI
</option>

<option value="WA">
WA
</option>

<option value="WI">
WI
</option>

<option value="WV">
WV
</option>

<option value="WY">
WY
</option>
</select>
<label>Zip:</label><input type="text" name="postal" required autocomplete="postal-code" /><br />
<label>Care Type:</label><select name="care_type" required>
<option value="primary">
Primary Care
</option>

<option value="mental">
Mental Health Care
</option>

<option value="extended">
Non-Institutional Extended Care
</option>

<option value="other">
Other
</option>
</select><br />
<input type="submit" value="submit" />
</form>
<script src="https://staging-va-gov-assets.s3-us-gov-west-1.amazonaws.com/js/jquery-3.3.1.min.js" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
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
			url: 'https://veteligibilitystatus.com/eligibility',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			context: Form,
			success: function(callback) {
				console.log(callback);
				if (callback.eligible) {
					$(this).text('You are eligible for Community Care');
				}
				else {
					$(this).text('You may be eligible for Community Care, please check with your provider')
				}
			},
			error: function() {
				$(this).html("We were unable to determine your eligibility, please check with your provider");
			}
		});
	});
//]]>
</script>
<script language="javascript" type="text/javascript">
$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#loading").show();
		$("#address_form").hide();
    }).ajaxStop(function () {
        $("#loading").hide();
		$("#address_form").show();
    });
});
</script>
