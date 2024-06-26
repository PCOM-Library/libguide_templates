function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

// Code for the PCOM Navigation
window.addEventListener('load', function(event) { 
	let e = null;
	// on guides, set aria-current 
	if(document.body.classList.contains('pcom-guide')) {
		e = document.querySelector('#s-lg-tabs-container .nav-pills > .active > a');
		if(e != null)
			e.setAttribute('aria-current','page');
	}

	if(document.getElementById('pcom-site-alert')) {
		if(document.querySelector('#pcom-site-alert .s-lib-box-content').innerText.trim().length > 0)
			document.getElementById('pcom-site-alert').style.display = 'block';
	}

	e = document.getElementById('pcom-nav-toggle');
	e.addEventListener('click', function(evt) {
		if(evt.target.getAttribute('aria-expanded') == 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
		}
		else {
			evt.target.setAttribute('aria-expanded', 'false');
		}
	});

	let triggers = document.querySelectorAll('#pcom-nav > ul > li > button');
	for(e of triggers) {
		// click events for the top-level menu buttons for dropdowns
		e.addEventListener('click', function(evt) {
			let opened_menu = document.querySelector('#pcom-nav > ul > li > button[aria-expanded="true"]');
			// close any sub menus opened previously
			if(opened_menu != null && evt.target != opened_menu) {
				// close other opened_menu
				opened_menu.setAttribute('aria-expanded', 'false');
			}
			
			if(evt.target.getAttribute('aria-expanded') == 'false') {
				evt.target.setAttribute('aria-expanded', 'true');
			}
			else {
				evt.target.setAttribute('aria-expanded', 'false');
			}
		});
	}
	
	document.addEventListener('keydown', function(event) {
		if(event.key === 'Escape') {
			if(document.activeElement == null || document.activeElement == document.body)
				return;
			if(document.getElementById('pcom-header').contains(document.activeElement)) {
				let width = document.body.offsetWidth;
				// detect if in responsive mode
				if(width < 59 * parseFloat(window.getComputedStyle(document.querySelector('body')).fontSize)) {
					document.getElementById('pcom-nav-toggle').focus();
				}
				else {
					let expanded_button = document.querySelector('#pcom-nav > ul > li > button[aria-expanded="true"]');
					if(expanded_button != null) {
						// check to see if a link in the opened menu has focus and move focus back to the toggle button
						let open_menu = expanded_button.nextElementSibling;
						if( document.activeElement != null && 
							document.activeElement != document.body && 
							document.activeElement.nodeName == 'A' && 
							open_menu.contains(document.activeElement) 
						) {
							expanded_button.focus();
						}
					}
				}
			}
		
			let expandeds = document.querySelectorAll('#pcom-header button[aria-expanded="true"]');
			for(e of expandeds) {
				e.setAttribute('aria-expanded', 'false');	
			}
		}
	});
});


/* LEGACY SEARCH WIDGET CODE */
$(document).ready(function() {
	if(window.location.href.indexOf("libguides.pcom.edu") > -1) { 
		jQuery(function ($) {
			// function to change target of catalog search
			/*
			$(function() {
				$('.catalogSearch').on('submit', function(event) {
					event.preventDefault();
					var queryString = $(this).serialize();
					window.location = "https://web.archive.org/web/20220519062632/https://login.ezproxy.pcom.edu/login?url=http://pcom.hosted.exlibrisgroup.com/vwebv/search?" + queryString;
				});
			});
			*/
			
			// function to change target of archives catalog search
			$(function() {
				$('.archivesCatalogSearch').on('submit', function(event) {
					event.preventDefault();
					var queryString = $(this).serialize();
					window.location = "http://archivedb.hosted.exlibrisgroup.com/vwebv/search?" + queryString;
				});
			});
		});
	}
});

/* Add min-height to books with cover images for indenting purposes */
window.addEventListener('load', function(event) { 
	let books = document.querySelectorAll('.s-lg-book-props:has(.s-lg-book-cover img)');
	for(b of books) {
		let i = b.querySelector('.s-lg-book-cover img');
		if(i.complete) {
			b.style.minHeight = 'calc(5px + .5rem + ' + i.height + 'px)'
		}
		else {
			i.onload = function(i_evt) { 
				let book = i_evt.target.closest('.s-lg-book-props');
				if(book != null)
					book.style.minHeight = 'calc(5px + .5rem + ' + i.height + 'px)'
			};
		}
	}
});

/* Add min-height to link lists with thumbnail images for indenting purposes */
window.addEventListener('load', function(event) { 
	let links = document.querySelectorAll('.s-lg-link-list li:has(a img)');
	for(b of links) {
		let i = b.querySelector('a img');
		if(i.complete) {
			b.style.minHeight = 'calc(5px + .5rem + ' + i.height + 'px)';
		}
		else {
			i.onload = function(i_evt) { 
				let book = i_evt.target.closest('.s-lg-book-props');
				if(book != null)
					book.style.minHeight = 'calc(5px + .5rem + ' + i.height + 'px)'
			};
		}
	}
});