//endsWith polyfill
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search, this_len) {
if (this_len === undefined || this_len > this.length) {
	this_len = this.length;
}
return this.substring(this_len - search.length, this_len) === search;
	};
}

//NodeList forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

//querySelectorAll polyfill
if (!document.querySelectorAll) {
	document.querySelectorAll = function (selectors) {
var style = document.createElement('style'), elements = [], element;
document.documentElement.firstChild.appendChild(style);
document._qsa = [];

style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
window.scrollBy(0, 0);
style.parentNode.removeChild(style);

while (document._qsa.length) {
	element = document._qsa.shift();
	element.style.removeAttribute('x-qsa');
	elements.push(element);
}
document._qsa = null;
return elements;
	};
}

//querySelector polyfill
if (!document.querySelector) {
	document.querySelector = function (selectors) {
var elements = document.querySelectorAll(selectors);
return (elements.length) ? elements[0] : null;
	};
}

if (!Array.prototype['forEach']) {
	Array.prototype.forEach = function(callback, thisArg) {
if (this == null) { throw new TypeError('Array.prototype.forEach called on null or undefined'); }
var T, k;
// 1. Let O be the result of calling toObject() passing the |this| value as the argument.
var O = Object(this);
// 2. Let lenValue be the result of calling the Get() internal method of O with the argument "length".
// 3. Let len be toUint32(lenValue).
var len = O.length >>> 0;
// 4. If isCallable(callback) is false, throw a TypeError exception.
// See: http://es5.github.com/#x9.11
if (typeof callback !== "function") { throw new TypeError(callback + ' is not a function'); }
// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
if (arguments.length > 1) { T = thisArg; }
// 6. Let k be 0
k = 0;
// 7. Repeat, while k < len
while (k < len) {
	var kValue;
	// a. Let Pk be ToString(k).
	// This is implicit for LHS operands of the in operator
	// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk. This step can be combined with c
	// c. If kPresent is true, then
	if (k in O) {
// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
kValue = O[k];
// ii. Call the Call internal method of callback with T as the this value and argument list containing kValue, k, and O.
callback.call(T, kValue, k, O);
	}
	// d. Increase k by 1.
	k++;
}
// 8. return undefined
	};
}

function settings() { //Shows and hides the settings.
	var settings = document.getElementById("settings");
	if (settings.style.display === "block") {
settings.style.display = "none";
	} else {
settings.style.display = "block";
	}
}

//This section determines the table being displayed.
var tb = document.forms["tableForm"].elements["table"];
for (var i=0; i<tb.length; i++) {
	tb[i].onclick = function() {
var tables = document.getElementsByClassName("checklist");
for (var t=0; t<tables.length; t++) {
	tables[t].style.display = "none";
}
document.getElementById(this.value).style.display = "block";
	}
}

//This section determines the preferences for boss icons.
function changePreference(matches, value) {
	for (var cell=0; cell<matches.length; cell++) { //Iterate through all matching cells.
if (!matches[cell].style.backgroundImage || matches[cell].style.backgroundImage.endsWith('dark.png")')) { //Set background image.
	matches[cell].style.backgroundImage = "url('Assets/" + value + "_dark.png')";
} else {
	matches[cell].style.backgroundImage = "url('Assets/" + value + ".png')";
}
matches[cell].className = "boss " + value; //Change class name.
	}
}

var cth = document.forms["cthulhuForm"].elements["icons"]; //Eye of Cthulhu Variants
for (var a=0; a<cth.length; a++) {
	cth[a].onclick = function() {
var matches = document.querySelectorAll(".eye_of_cthulhu, .eye_of_cthulhu2"); //Find all matching cells.
changePreference(matches, this.value);
	}
}

var eab = document.forms["eaterBrainForm"].elements["icons"]; //Eater of Worlds/Brain of Cthulhu Variants
for (var b=0; b<eab.length; b++) {
	eab[b].onclick = function() {
var matches = document.querySelectorAll(".eater_and_brain, .eater_of_worlds, .brain_of_cthulhu"); //Find all matching cells.
changePreference(matches, this.value);
	}
}

var twn = document.forms["twinsForm"].elements["icons"]; //The Twins Variants
for (var c=0; c<twn.length; c++) {
	twn[c].onclick = function() {
var matches = document.querySelectorAll(".the_twins, .the_twins2, .retinazer, .retinazer2, .spazmatism, .spazmatism2"); //Find all matching cells.
changePreference(matches, this.value);
	}
}

var plt = document.forms["planteraForm"].elements["icons"]; //Plantera Variants
for (var d=0; d<plt.length; d++) {
	plt[d].onclick = function() {
var matches = document.querySelectorAll(".plantera, .plantera2"); //Find all matching cells.
changePreference(matches, this.value);
	}
}

//This section determines the selected theme.
var bg = document.forms["themeForm"].elements["theme"];
for (var j=0; j<bg.length; j++) {
	bg[j].onclick = function() {
document.body.className = this.value;
	}
}

//This section determines which bosses are highlighted.
document.querySelectorAll(".checklist td") //Find every cell in the table.
.forEach(function(e) { e.addEventListener("click", function() { //Listen for clicks for each cell.
	var boss = this.className.split("boss ")[1]; //Find boss name.
	var matches = document.getElementsByClassName(this.className); //Find all matching cells.
	if (!this.getAttribute("style") || this.style.backgroundImage.endsWith('dark.png")')) { //Set backgrounds according to the current background.
for (var cell=0; cell<matches.length; cell++) {
	matches[cell].style.backgroundImage = "url('Assets/" + boss + ".png')"; //Set as highlighted.
}
	} else {
for (var cell=0; cell<matches.length; cell++) {
	matches[cell].style.backgroundImage = "url('Assets/" + boss + "_dark.png')"; //Set as darkened.
}
	}
})});

//Parse and apply params
var queryDict = parseQueryString();
handleQuery(queryDict, "table");
handleQuery(queryDict, "theme");
handleQuery(queryDict, "cthulhu");
handleQuery(queryDict, "eaterBrain");
handleQuery(queryDict, "twins");
handleQuery(queryDict, "plantera")

function handleQuery(dict, name) {
	if(dict[name] !== undefined) {
document.querySelector("#" + name + "Form input[value='" + dict[name] + "']").click();
	}
}

//Change query params on settings change
document.querySelectorAll("#settings input").forEach(function(e) { e.addEventListener("click", function() {
	var queries = parseQueryString();
	queries[this.parentNode.id.slice(0, -4)] = this.value;
	window.history.pushState("", "", getQueryUrl(queries));
})});

function getQueryUrl(queryDict) {
	if(queryDict === undefined) {
queryDict = parseQueryString();
	}
	var url = window.location.href.split("?")[0];
	var keys = Object.keys(queryDict);
	for (var i = 0; i < keys.length; i++) {
url += (i == 0 ? "?" : "&") + keys[i] + "=" + queryDict[keys[i]];
	}
	return url;
}

function parseQueryString() {
	var queries = {};
	var paramUrl = window.location.href.split("?")[1];
	if(paramUrl === undefined || paramUrl.length == 0) {
return queries;
	}
	var params = paramUrl.split("&");
	for (var i = 0; i < params.length; i++) {
var pair = params[i].split("=");
queries[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return queries;
}