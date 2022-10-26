function repairAndMoveSubjectDisclosure(orig, text, target) {
	let n;
	let container, heading, button, badge, panel;

	heading = document.createElement('H3');
	button = document.createElement('BUTTON');
	// fill text from link (parse out the guide count)
	button.innerHTML = text;
	button.setAttribute('aria-expanded','false');
	button.setAttribute('aria-controls', orig.querySelector('a').getAttribute('aria-controls'));
	button.addEventListener('click', function(evt) {
		if(button.getAttribute('aria-expanded') == 'true')
			button.setAttribute('aria-expanded','false');
		else
			button.setAttribute('aria-expanded','true');
		evt.target.parentElement.classList.toggle('open');
	});

	// add guide info
	n = orig.querySelector('a .badge').innerText;
	badge = document.createElement('SPAN');
	badge.innerHTML = ' ' + n;
	if(n == '1')
		badge.innerHTML += '<span class="sr-only"> guide</span>';
	else
		badge.innerHTML += '<span class="sr-only"> guides</span>';

	heading.append(button);
	heading.append(badge);

	// collpasing panel
	panel = document.getElementById( button.getAttribute('aria-controls') );
	panel.removeAttribute('aria-labelledby');
	panel.removeAttribute('class');
	panel.classList.add('pcom-collapsing-panel');

	// container
	container = document.createElement('DIV');
	container.classList.add('pcom-subject-disclosure-container');
	container.append(heading);
	container.append(panel);

	// add to page
	target.append(container);
}

const PROGRAMS = [
	'Basic Sciences',
	'Biomedical Sciences',
	'Forensic Medicine',
	'Medical Laboratory Science',
	'Organizational Development and Leadership',
	'Osteopathic Medicine',
	'Pharmacy',
	'Physical Therapy',
	'Physician Assistant Studies',
	'Psychology and Behavioral Sciences'
];
const HOMEPAGE_URL = 'https://libguides.pcom.edu/';

function separateSubjectsHomepage() {
	let subjects = document.querySelectorAll('#s-lg-index-list-subjects .panel-heading');
	let d_count = 0, a_count = 0;
	let d_split = Math.ceil(PROGRAMS.length / 2), a_split = Math.ceil( (subjects.length - PROGRAMS.length)/2 );

	for(e of subjects) {
		let txt = e.querySelector('a .bold').childNodes[0].data;
		if(txt == PROGRAMS[d_count]) {
			if(d_count < d_split)
				repairAndMoveSubjectDisclosure(e, txt, document.getElementById('pcom-programs-col-1'));
			else
				repairAndMoveSubjectDisclosure(e, txt, document.getElementById('pcom-programs-col-2'));
			d_count += 1;
		}
		else {
			if(a_count < a_split)
				repairAndMoveSubjectDisclosure(e, txt, document.getElementById('pcom-additional-col-1'));
			else
				repairAndMoveSubjectDisclosure(e, txt, document.getElementById('pcom-additional-col-2'));
			a_count += 1;
		}
	}

}

function cleanBySubjectsView() {
	let subjects = document.querySelectorAll('#s-lg-index-list-subjects .panel-heading');
	let s_count = 0;
	let s_split = Math.ceil(subjects.length / 2);

	for(e of subjects) {
		let txt = e.querySelector('a .bold').childNodes[0].data;
		if(s_count < s_split)
			repairAndMoveSubjectDisclosure(e, txt, document.getElementById('pcom-subjects-col-1'));
		else
			repairAndMoveSubjectDisclosure(e, txt, document.getElementById('pcom-subjects-col-2'));
		s_count += 1;
	}
}


const titleObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
		if(document.location == HOMEPAGE_URL)
			document.title = document.title.replace('Guides BY SUBJECT','Home');
		titleObserver.disconnect();
    });
});
titleObserver.observe(document.querySelector('title'), { childList: true });


// Use mutation observer to separate subjects when they are loaded
const subjectObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			if(added_node.nodeName != 'SECTION')
				continue;
			if(added_node.getAttribute('aria-label') != 'List of Subjects')
				continue;

			/* this is the homepage so split subjects */
			if(document.location == HOMEPAGE_URL) {
				separateSubjectsHomepage();
				document.getElementById('pcom-quick-links-section').style.display ='block';
				document.getElementById('pcom-program-section').style.display ='block';
				document.getElementById('pcom-additional-section').style.display = 'block';
			}
			/* this must be the by subject page */
			else {
				cleanBySubjectsView();
				document.querySelector('#pcom-list-subjects h2').innerText = document.getElementById('s-lg-index-list-header').innerText;
				document.getElementById('pcom-subject-section').style.display = 'block';
			}
			subjectObserver.disconnect();
			added_node.style.display = 'none';
			document.getElementById('s-lg-index-list').style.display = 'none';
			document.getElementById('s-lg-guide-list-controls').style.display = 'none';
		};
	});
});

let urlParams = new URLSearchParams(window.location.search);
if(document.location == HOMEPAGE_URL || urlParams.get('b') == 's') {
	subjectObserver.observe(document.body, { subtree: true, childList: true });
}

/* Fix what nav link is active */
window.addEventListener('DOMContentLoaded', function(evt) {
	if(document.location == HOMEPAGE_URL) {
		document.querySelector('#s-lg-hp-nav li.s-lg-index-nav-btn.active').classList.toggle('active');
		document.getElementById('s-lg-index-home-btn').classList.toggle('active');
	}
});

