let oldHref = document.location.search;
var PaginationObserver = null;
var SearchHrefObserver = null;
var SearchResultsObserver = null;

window.addEventListener('DOMContentLoaded', function(evt) {
	console.log('DOM Content Loaded');
	// adjust H1
	updateSearchResultsH1();
	if(SearchHrefObserver != null)
		SearchHrefObserver.disconnect();
	SearchHrefObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.search) {
                oldHref = document.location.search;
                updateSearchResultsH1();
            }
        });
    });
    SearchHrefObserver.observe(document.body, { subtree: true, childList: true });

	// setup tablist
	let TAB_NAMES = ['Guides', 'Databases', 'FAQ', 'Calendar'];
	let tab_name_index = 0;
	let tabheading = htmlToElement('<h3 id="pcom-search-results-tabs" class="sr-only">Search Areas</h3>');
	let tablist = htmlToElement('<div class="pcom-tablist" role="tablist" aria-labelledby="pcom-search-results-tabs"></div>');
	for(t of document.querySelectorAll('#s-srch-tabs button[role="tab"]')) {
		let button = htmlToElement('<button type="button" role="tab">');
		button.setAttribute('aria-controls', t.getAttribute('aria-controls'));
		button.setAttribute('id', t.getAttribute('aria-controls') + '_tab');
		if(tab_name_index < TAB_NAMES.length) {
			button.innerText = TAB_NAMES[tab_name_index];
			tab_name_index = tab_name_index + 1;
		}
		else
			button.innerText = t.innerText.trim();
		button.setAttribute('data-source', t.parentElement.getAttribute('data-source'));
		
		// pass click on through
		button.addEventListener('click', function(evt) { 
			document.querySelector('#s-srch-tabs li[data-source="' + evt.target.getAttribute('data-source') + '"] button').click();
		});
		
		tablist.appendChild(button);
		tablist.appendChild( htmlToElement('<div class="spacer"></div>') );
	}
	tablist.querySelector('.spacer:last-of-type').setAttribute('class','hfill');
	document.getElementById('s-srch-tabs').insertAdjacentElement('beforebegin', tabheading);
	document.getElementById('s-srch-tabs').insertAdjacentElement('beforebegin', tablist);
	document.getElementById('s-srch-tabs').style.display = 'none';
	new PCOMTabPanel(tablist);

	let tabpanels = htmlToElement('<div class="pcom-tab-content">');
	for(t of document.querySelectorAll('#s-lg-srch-content [role="tabpanel"]')) {
		t.classList.add('tab-pane');
		t.classList.remove('hidden');
		tabpanels.appendChild(t);
	}
	document.getElementById('s-srch-tabs').insertAdjacentElement('afterend', tabpanels);

	if(SearchResultsObserver != null)
		SearchResultsObserver.disconnect;
	SearchResultsObserver = new MutationObserver(function(mutations_list) {
		mutations_list.forEach(function(mutation) {
			for(added_node of mutation.addedNodes) {
				if(added_node.nodeType != 1)
					continue;

				if(added_node.classList.contains('s-srch-results')) {
					reconfigureSearchResultsHeader(added_node);
				}
			}
		});
	});
	SearchResultsObserver.observe(document.getElementById('s-lg-srch-cols'), { subtree: true, childList: true });
	
});


function generateSearchHeading(pcomHeader, container) {
	let grand_total = 0;
	if(container.querySelector('strong')) {
		if(container.querySelector('strong').childElementCount == 0) {
			pcomHeader.querySelector('.pcom-search-heading').innerText = 'Search returned zero results';

		}
		else {
			let counts = container.querySelector('strong').innerText.match(/Showing ([0-9]+) of ([0-9]+)/);
			let page_total = parseInt(counts[1]);
			grand_total = parseInt(counts[2]);
			let page_base = container.querySelector('.pagination li.active a').getAttribute('onclick').match(/changeStart\(([0-9]+),/)[1];
			
			page_base = parseInt(page_base);
			pcomHeader.querySelector('.pcom-search-heading').innerText = 'Showing results ' + (page_base + 1) + ' to ' + (page_base + page_total) + ' of ' + grand_total + ' total';
		}
	}
	else {
		let counts = container.querySelector('.s-srch-range span').innerText.match(/Showing ([0-9]+) - ([0-9]+) of ([0-9]+)/);
		let index1 = parseInt(counts[1]);
		let index2 = parseInt(counts[2]);
		grand_total = parseInt(counts[3]); 
		
		if(grand_total == 0)
			pcomHeader.querySelector('.pcom-search-heading').innerText = 'Search returned zero results';
		else
			pcomHeader.querySelector('.pcom-search-heading').innerText = 'Showing results ' + index1 + ' to ' + index2 + ' of ' + grand_total + ' total';		
	}
	
	return grand_total;
}

function generateSearchSorter(pcomHeader, container) {
	// sorter
	if(container.querySelector('a.dropdown-toggle')) {
		let sorter = pcomHeader.querySelector('.pcom-sorter');
		// first remove any children in it
		while(sorter.firstChild)
			sorter.removeChild(sorter.firstChild);
		
		let sort = htmlToElement('<button class="pcom-search-sorter" aria-expanded="false"></button>');
	
		sorter.appendChild(htmlToElement('<span id="sort-label">Sorted By: </span>'));
		// fake the span being a label
		sorter.querySelector('span').addEventListener('click', function(evt) {
			evt.target.nextElementSibling.focus();
		});
		
		let e = container.querySelector('a.dropdown-toggle');
		e.setAttribute('title', ''); 
		sort.innerText = e.innerText;
		sort.setAttribute('aria-labelledby',  'sort-label ' + e.getAttribute('id'));
		sort.addEventListener('click', function(evt) {
			if(evt.target.getAttribute('aria-expanded') == 'false')
				evt.target.setAttribute('aria-expanded', 'true');
			else
				evt.target.setAttribute('aria-expanded', 'false');
		});
		sorter.appendChild(sort);
		
		e = container.querySelector('a.dropdown-toggle + ul');
		let list = htmlToElement('<ul role="list"></ul>');
		for(link of e.querySelectorAll('a')) {
			let b = htmlToElement('<li><button></button></li>');
			b.querySelector('button').innerText = link.innerText;
			b.querySelector('button').setAttribute('onClick', link.getAttribute('onClick'));
			list.appendChild(b);
		}
		sorter.appendChild(list);
	}
}

function generateSearchPager(pcomHeader, container) {
	// pager 
	if(container.querySelector('strong')) {
		let pager = pcomHeader.querySelector('.pcom-pager');
		// first remove any children in it
		while(pager.firstChild)
			pager.removeChild(pager.firstChild);
		
		let old_pager = container.querySelector('strong ul.pagination');
		if(old_pager != null) {
			let div_label = htmlToElement('<div style="display:none">Search Results Pagination</div>');
			pager.insertAdjacentElement('beforebegin', div_label);
			let ul = htmlToElement('<ul role="list" aria-labelledby=""></ul>');
			let id = container.getAttribute('id');
			div_label.setAttribute('id', id + '_pcom_pager');
			ul.setAttribute('aria-labelledby', id + '_pcom_pager');
			
			for(page of old_pager.querySelectorAll('li a')) {
				if(page.parentElement.classList.contains('disabled'))
					continue;
				let li = htmlToElement('<li><button></button></li>');
				let b = li.querySelector('button');
				b.setAttribute('onclick', page.getAttribute('onclick'));
				
				switch (page.innerText.trim()) {
					case '<<':
						txt = '<span class="fa fa-backward" aria-hidden="true"></span><span class="sr-only">First page</span>';
						break;
					case '<':
						txt = '<span class="fa fa-caret-left" aria-hidden="true"></span><span class="sr-only">Previous page</span>';
						break;
					case '>':
						txt = '<span class="fa fa-caret-right" aria-hidden="true"></span><span class="sr-only">Next page</span>';		
						break;
					case '>>':
						txt = '<span class="fa fa-forward" aria-hidden="true"></span><span class="sr-only">Last page</span>';	
						break;
					default:
						txt = page.innerText.trim();
				}
				b.innerHTML = txt;
				if(page.parentElement.classList.contains('active'))
					b.setAttribute('aria-current', 'page');
				ul.appendChild(li);
			}
			// only show pagination if there are multiple pages
			if(ul.childElementCount > 1)
				pager.appendChild(ul);
		}
	}
	else {
	}
}


function reconfigureSearchResultsHeader(results) {
	console.log(results);
	let container = results.closest('[role="tabpanel"]');
	
	
	let pcomHeader = container.querySelector('.pcom-results-header');
	if(pcomHeader)
		pcomHeader.remove();
	pcomHeader = htmlToElement('<div class="pcom-results-header col-sm-12"><div class="pcom-search-heading"></div><div class="pcom-sorter"></div><div class="pcom-pager"></div></div>');
	
	
	let pcomFooter = container.querySelector('.pcom-results-footer');
	if(pcomFooter) 
		pcomFooter.remove();
	pcomFooter = htmlToElement('<div class="pcom-results-footer col-sm-12"></div>');

	// heading
	let numberResults = generateSearchHeading(pcomHeader, container);

	if(numberResults > 0) {
		// sorter 
		generateSearchSorter(pcomHeader, container);
		// pager
		generateSearchPager(pcomHeader, container);
	}


	

	// footer
	while(pcomFooter.firstChild)
		pcomFooter.removeChild(pcomFooter.firstChild);
	pcomFooter.appendChild(pcomHeader.querySelector('.pcom-pager').cloneNode(true));

	try {
		// hide the default stuff
		
		if(container.querySelector('strong')) {
			container.querySelector('strong').classList.add('hidden');
			if(container.querySelector('.s-srch-results + div  ul.pagination'))
				container.querySelector('.s-srch-results + div  ul.pagination').classList.add('hidden');
		}

		// add pcomHeader
		if(container.querySelector('.s-srch-header'))
			container.querySelector('.s-srch-header').insertAdjacentElement('beforebegin', pcomHeader);
		else
			container.querySelector('.s-srch-results').insertAdjacentElement('beforebegin', pcomHeader);

		// add footer
		container.querySelector('.s-srch-results').insertAdjacentElement('afterend', pcomFooter);
	}
	catch(error) {
		console.log(error);
	}
	
}

function updateSearchResultsH1() {
	try {
		let search = (new URLSearchParams(document.location.search)).get('q');
		if(search == null || search.trim() == 0)
			document.querySelector('h1').innerHTML = 'Results';
		else
			document.querySelector('h1').innerHTML = '<div>Results for: </div><div>' + search + '</div>';
	}
	catch(error) {
		console.log(error);
	}
}