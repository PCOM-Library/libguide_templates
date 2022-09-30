/********
 GENERAL 
 ********/

* {	box-sizing: border-box; }

:root {
	--pcom-yellow: #fcaf16;
	--pcom-blue: #00448d;
	--pcom-red: #fb2d37;
	--pcom-dark-blue: #1a203a;
	--pcom-dark-red: #a20a3a;
	--pcom-cyan: #00e4e1;
	--pcom-cool-gray: #edf6f5;
	--pcom-text: #111;
	--pcom-body-padding: 0.625em;
	--pcom-dark-gray: #666;
	--pcom-light-gray: #ddd;
}

html {
	font-size: 100% !important; /* fix font a11y issue */
	height: 100%;
}

body {
	height: 100%;
	font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;	
	margin: 0;
	min-width: 350px;
	font-size: 100% !important;
	padding-left: 0;
	padding-right: 0;
	/* push footer to the bottom */
	display: flex;
	flex-direction: column;
	color: var(--pcom-text);
}

main {
	flex: 1 0 auto;
}

footer {
	flex-shrink: 0;
}

a { 
  text-decoration: underline;
	color: var(--pcom-blue)
}

/*******************
 SCREEN READER ONLY 
 *******************/
.sr-only {
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	width: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
}

/**********
 SKIP LINK 
 **********/
#s-lg-public-skiplink {
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	width: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	border-radius: 0;
	border-bottom: 0;
	border-right: 0;
}
#s-lg-public-skiplink:focus {
	/* undo hiding */
	clip: auto;
	clip-path: none;
	height: auto;
	width: auto;
	left: 0.5em;
	top: 0.5em;
	text-decoration: none;
	z-index: 10000;
	padding: 0.75rem 0.75rem;
	background: var(--pcom-dark-red);
	color: #fff;
	line-height: 1;
	outline: dotted #fff 2px !important;
	outline-offset: -4px;
	box-shadow: 0.25rem 0.25rem 0.375rem rgba(0, 0, 0, 0.6);
}

/*******************
 PCOM CUSTOM HEADER
 *******************/
#pcom-header {
	background-color: var(--pcom-dark-blue);
	padding: var(--pcom-body-padding);
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: flex-end;
}
#pcom-header a:focus,
#pcom-header button:focus {
	outline: dotted 2px #fff;
}


#pcom-logo, #pcom-logo a {
	display: inline-block;
	text-decoration: none;
	color: #fff;
	font-size: 0.875rem;
}
#pcom-logo a div {
	line-height: 1;
	padding-top: 0.375rem;
	text-align: center;
}
#pcom-logo a:focus {
	outline-offset: 0.25rem;
}

#pcom-nav {
	z-index: 1001;
}

#pcom-nav-toggle {
	font-size: 1.375rem;
	line-height: 1;
	background: var(--pcom-blue);
	color: #fff;
	border: solid 2px var(--pcom-dark-blue);
	padding: 0.5rem;
	box-shadow: 0.25rem 0.25rem 0.375rem rgba(0, 0, 0, 0.6);
}
#pcom-nav-toggle[aria-expanded="true"] {
	color: var(--pcom-blue);
	background: #fff;
	box-shadow: 0.25rem 0.25rem 0.375rem rgba(0, 0, 0, 0.6) inset;
}

#pcom-nav-toggle:hover {
	background: #fff;
	color: var(--pcom-blue);
}
#pcom-nav-toggle:focus {
	outline: currentColor 2px dotted !important;
	outline-offset: -0.3125rem;
}

#pcom-nav-toggle span {
	pointer-events: none;
}

#pcom-nav-toggle[aria-expanded="false"] + nav {
	display: none;
}
#pcom-nav-toggle[aria-expanded="true"] + nav {
	display: block;
	position: absolute;
	left: var(--pcom-body-padding);
	right: var(--pcom-body-padding);
	top: calc(100% - var(--pcom-body-padding) - 1px);
	box-shadow: 0.25rem 0.25rem 0.375rem rgba(0, 0, 0, 0.6);
}
#pcom-nav > ul {
	margin: 0;
	padding: 0.125rem 0 0;
	list-style: none;
}

#pcom-nav > ul > li {
	color: #fff;
	background: var(--pcom-blue);
}
#pcom-nav > ul > li > a, 
#pcom-nav > ul > li > button {
	display: block;
	width: 100%;
	text-align: left;
	background: transparent;
	color: currentColor;
	border: 0;
	text-decoration: none;
	font-size: 1rem;
	line-height: 1;
	padding: 0.75rem 0.75rem;
}

#pcom-nav > ul > li > a:hover,
#pcom-nav > ul > li > button:hover {
	background: #fff !important;
	color: var(--pcom-blue) !important;
}
#pcom-nav > ul > li > a:focus,
#pcom-nav > ul > li > button:focus {
	outline: 2px dotted currentColor;
	outline-offset: -4px;
}

#pcom-nav > ul > li > button[aria-expanded="true"]  {
	background: var(--pcom-blue);
}
#pcom-nav > ul > li > button[aria-expanded="false"] + ul {
	display: none;
}
#pcom-nav > ul > li > button[aria-expanded="true"] + ul {
	display: block;
}

#pcom-nav > ul > li > button:after {
	content: "";
	display: inline-block;
	width: 0;
	height: 0;
	margin-left: 0.25rem;
	vertical-align: middle;
	border-top: 0.375rem  solid;
	border-bottom: 0;
	border-right: 0.375rem solid transparent;
	border-left: 0.375rem solid transparent;
}
#pcom-nav > ul > li > button[aria-expanded="true"]:after {
	border-bottom: 0.375rem solid;
	border-top: 0;
}

#pcom-nav > ul > li > button + ul {
	list-style: none;
	padding-left: 1.5rem;
	
}

#pcom-nav > ul > li > button + ul li a {
	display: block;
	color: currentColor;
	font-weight: bold;
	font-size: 1rem;
	line-height: 1;
	padding: 0.75rem 0.75rem;	
	text-decoration: none;		
}

#pcom-nav > ul > li > button + ul li a:hover {
	background: #fff;
	color: var(--pcom-blue);
}
#pcom-nav > ul > li > button + ul li a:focus {
	outline: 2px dotted currentColor;
	outline-offset: -4px;
}

@media only screen and (min-width: 62rem) {
	#pcom-nav-toggle {
		display: none;
	}
	#pcom-nav-toggle[aria-expanded="true"] {
		background: transparent;
		box-shadow: none;
	}
	#pcom-nav-toggle[aria-expanded="false"] + nav,
	#pcom-nav-toggle[aria-expanded="true"] + nav {
		display: block;
		position: static;
		border: none;
		box-shadow: none;
	}
	
	#pcom-nav > ul {
		position: relative;		
		padding: 0;
	}
	#pcom-nav > ul > li {			
		display: inline-block;
		position: relative;
		background: transparent;
	}

	#pcom-nav > ul > li + li {
	}
	
	#pcom-nav > ul > li > a, 
	#pcom-nav > ul > li > button {
		display: block;
		width: 100%;
		text-align: left;
		background: transparent;
		color: #fff;
		border: 0;
		text-decoration: none;
		font-size: 1rem;
		line-height: 1;
		padding: 0.75rem 0.625rem; 
	}
	
	#pcom-nav > ul > li > button + ul {
		position: absolute;
		right: 0;
		top: calc(100% - 1px);
		padding: 0.5em 0;
		margin: 0;
		background: var(--pcom-blue);
		color: #fff;
		box-shadow: 0.25rem 0.25rem 0.375rem rgba(0, 0, 0, 0.6);
	}	
	#pcom-nav > ul > li > button + ul li {
		display: block;
	}
	#pcom-nav > ul > li > button + ul li a {
		display: block;
		color: #fff;
		white-space: nowrap;
		font-weight: bold;
		padding: 0.625rem 1rem;	
		text-decoration: none;
	}
}

/************
 BREADCRUMBS
*************/
#s-lib-bc .breadcrumb {
	font-size: 0.825rem;
}

.breadcrumb > li + li::before
#s-lib-bc .breadcrumb > .active {
	color: var(--pcom-text);
}

/*******
 FOOTER
********/
footer#page-footer {
	background-color: var(--pcom-dark-blue);
	padding: var(--pcom-body-padding);
}

/*******************
 SPRINGSHARE FOOTER
********************/
#s-lib-footer-public {
	background: transparent !important;
	border: 0;
	color: #fff;
}
#s-lib-footer-public a {
	color: var(--pcom-cool-gray);
}

/*******************
 PCOM CUSTOM FOOTER 
 *******************/
#pcom-footer {
	padding: 0.625rem 1rem;
	position: relative;
	text-align: center;
}

#pcom-footer a.footer-brand {
	display: inline-block;
}
#pcom-footer a.footer-brand:focus {
	outline-offset: 2px;
}

#pcom-footer a {
	color: #fff;
}
#pcom-footer a:focus {
	outline: dotted 2px #fff;
}

#pcom-footer a.footer-brand img {
	width: 150px;
}

#pcom-footer ul#footer-nav {
	list-style: none;
	margin: 0;
	padding: 0;
	margin: 0;
}

#pcom-footer ul#footer-nav li {
	display: inline-block;
	padding: 0 0.5rem;
	line-height: 1.75;
}

#pcom-footer ul#footer-nav li a {
	display: inline-block;
	padding: 0.125rem 0;
	color: #fff;
	text-decoration: none;
	line-height: normal;
}
#pcom-footer ul#footer-nav li a:hover {
	text-decoration: underline;
}
#pcom-footer ul#footer-nav li a:focus {
	outline-offset: 4px;
}

#pcom-footer-social-menu {
	text-align: center;
	margin-top: 1rem;
}
#pcom-footer-social-menu ul {
	list-style: none;
	padding: 0;
	display: inline-block;
	margin: 0
	text-align: center;
}
#pcom-footer-social-menu ul li {
	display: inline-block;
}
#pcom-footer-social-menu ul li + li {
	margin-left: 0.25rem;
}
#pcom-footer-social-menu a {
	display: block;
	text-align: center;
	text-decoration: none;
}
#pcom-footer-social-menu a.facebook {
  background-color: var(--pcom-blue);
}
#pcom-footer-social-menu a.youtube {
  background-color: var(--pcom-dark-red);
}
#pcom-footer-social-menu a.mail {
  background-color: var(--pcom-yellow);
}
#pcom-footer-social-menu a {
  text-align: center;
  height: 2.375rem;
  width: 2.375rem;
  line-height: 2.375rem;
  border-radius: 50%;
  display: block;
  border: solid 2px transparent;
}
#pcom-footer-social-menu a:hover {
	border-color: #fff;
}
#pcom-footer-social-menu a:focus {
	outline-offset: 2px;
}
	
#pcom-footer-social-menu a.mail .fa {
  position: relative;
  top: -2px;
  left: 0.5px;
  color: #000;
}
#pcom-footer-social-menu a.youtube .fa {
  position: relative;
  top: -1.5px;
}

@media only screen and (min-width: 60rem) {
	#pcom-footer {
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		text-align: left;
		display: flex;
	}
	
	
	/* left-align the PCOM nav links */
	#pcom-footer ul#footer-nav li:first-child {
		padding-left: 0;
	}
	#pcom-footer ul#footer-nav li:last-child {
		padding-right: 0;
	}


}

/* Adjust column ratios for homepage only - 2022-08-31 */
@media (min-width: 992px) {
	  .pcom-guide-homepage #col1 {
		width: 80%;
	  }
	  .pcom-guide-homepage #col2 {
		width: 20%; 
	  }
}
/* Ensure some padding when the screen gets small enough */
@media (max-width: 768px) {
	.s-lib-side-borders {
	  padding-left: var(--pcom-body-padding);
	  padding-right: var(--pcom-body-padding);
	}
}

/* branding */
.s-lib-public-side-header h2 {
	color: var(--pcom-blue);
}

/* icon fix - 2022-09-09 */
.s-lg-az-result-badges img[alt="Open Access"] {
	max-width: none;
	position: relative;
	top: 2px;
}


/************
 chat widget 
 ************/
.lcs_slide_out {
	background-color: rgb(249, 249, 249);
	border: 1px solid #ccc;
	z-index: 1000;
}
.lcs_slide_out header a {
	text-decoration: none;
	color: #fff !important;
	background-color: var(--pcom-dark-red) !important;
	box-shadow: none !important;
	border: 0 !important;
	padding: 0.75em !important;
}



