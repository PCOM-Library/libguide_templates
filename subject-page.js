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

const subjectPageProfileObserver = new MutationObserver(function(mutations_list) {
	let expert = document.getElementById('s-lg-box-profile-container');
	// handle single expert situation
	if(expert != null) {
		let new_expert = htmlToElement('<div class="s-lib-featured-profile-container"><a href=""><div class="s-lib-featured-profile-image"><img loading="lazy" src="" alt=""></div><div class="s-lib-profile-div s-lib-featured-profile-name"></div></a></div>');
		
		let profile_id = expert.querySelector('.s-lib-profile-image img').getAttribute('src').match(/\/accounts\/([0-9]+)\//)[1];
		e = new_expert.querySelector('img');
		e.setAttribute('src', expert.querySelector('.s-lib-profile-image img').getAttribute('src'));
		e.setAttribute('alt', expert.querySelector('.s-lib-profile-image img').getAttribute('alt'));
		
		new_expert.querySelector('a').setAttribute('href', 'https://customertesting4.libguides.com/prf.php?account_id=' + profile_id);
		
		new_expert.querySelector('.s-lib-featured-profile-name').innerText = expert.querySelector('.s-lib-profile-name').innerText.trim();
		document.querySelector('#s-lg-sb-experts-div .pad-top-sm').appendChild(new_expert);
		subjectPageProfileObserver.disconnect();
		return;
	}
	if(document.querySelector('.s-lib-featured-profile-container') != null) {
		subjectPageProfileObserver.disconnect();
		return;
	}
});
subjectPageProfileObserver.observe(document.getElementById('col2'), { subtree: true, childList: true });


window.addEventListener('DOMContentLoaded', function(evt) {
	let e;
	let subject = document.querySelector('h1').innerText.trim();

	// edit search instructions
	e = document.querySelector('.pcom-subject-page #col2 div:nth-of-type(2) div.margin-bottom-med');
	e.innerHTML = 'Search the full text of this site filtered for the subject: <em>' + subject + '</em>.'

});