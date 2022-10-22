var GUIDE_COUNT = 0, GUIDE_TOTAL = -1;

const subjectPageGuideObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			// skip non-elemtn nodes
			if(added_node.nodeType != 1)
				continue;
			
			let e = null;
			if(added_node.querySelector('h2.muted') != null) {
				try {
					let n = added_node.querySelector('h2.muted').innerText.match(/[0-9]+/)[0];
					GUIDE_TOTAL = parseInt(n);
				}
				catch(error) {
					// failed to parse the guide count
					subjectPageGuideObserver.disconnect();
					return;
				}
			}
			else if(added_node.querySelector('.s-lg-gtitle') != null) {
				let a = added_node.querySelector('.s-lg-gtitle');
				a.parentElement.prepend(a);
				GUIDE_COUNT = GUIDE_COUNT + 1;
			}
		}
	});
	if(GUIDE_COUNT == GUIDE_TOTAL) {
		subjectPageGuideObserver.disconnect();
	}
});
subjectPageGuideObserver.observe(document.getElementById('s-lg-sb-guides'), { subtree: true, childList: true });

window.addEventListener('DOMContentLoaded', function(evt) {
	let e;
	let subject = document.querySelector('h1').innerText.trim();

	// edit search instructions
	e = document.querySelector('.pcom-subject-page #col2 div:nth-of-type(2) div.margin-bottom-med');
	e.innerHTML = 'Search the full text of this site filtered for the subject: <em>' + subject + '</em>.'

});