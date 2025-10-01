// Use mutation observer to remake profiles as they are loaded to limit flashing
const profileObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			if(added_node.nodeType != 1)
				continue;
			if(!added_node.classList.contains('s-lib-profile-container'))
				continue;
			addPcomProfileBox(added_node);
			
		}
	});
});
if(document.getElementById('s-lg-guide-tabs')) 
	profileObserver.observe(document.getElementById('s-lg-guide-tabs'), { subtree: true, childList: true });

function addPcomProfileBox(profile) {
	profile.closest('[id^=s-lg-box-wrapper-]').style.display = 'none';
	
	let librarians_box = document.getElementById('pcom-librarians-box');
	if(librarians_box == null) {
		// create the box
		librarians_box = htmlToElement('<div id="pcom-librarians-box"><div class="s-lib-box-container"><div class="s-lib-box s-lib-box-std"><h2 class="s-lib-box-title">Librarian</h2><div><div class="s-lib-box-content"><div></div></div></div></div>');
		document.querySelector('#s-lg-col-0 .s-lg-col-boxes').prepend(librarians_box);
	}	
	else {
		// pluralize librarians
		librarians_box.querySelector('h2').innerText = 'Librarians';
	}	
		
	let a, div, img;
	let pcom_profile = htmlToElement('<div class="pcom-profile-box"><div class="info-holder"></div><div class="image-holder"></div></div>');
	let pcom_info = pcom_profile.querySelector('.info-holder'); 
	
	// link
	a = document.createElement('A');
	a.setAttribute('href', profile.querySelector('a').getAttribute('href'));
	a.innerText = profile.querySelector('.s-lib-profile-name').innerText.trim();
	let h3 = htmlToElement('<h3 class="pcom-profile-heading"></h3>');
	h3.appendChild(a);
	pcom_info.appendChild( h3 );
	
	// image
	div = document.createElement('DIV');
	div.classList.add('pcom-profile-image');
	div.appendChild(profile.querySelector('.s-lib-profile-image img'));
	pcom_profile.querySelector('.image-holder').appendChild(div);
	
	// pronouns
	let pronouns = profile.querySelector('.s-lib-profile-pronouns').innerText.trim();
	if(pronouns.length > 0) {
		div = document.createElement('DIV');
		div.classList.add('pcom-profile-pronouns');
		div.innerText = ' (' + pronouns + ')';
		pcom_info.appendChild(div);
	}
	
	// campus 
	if(profile.querySelector('.pcom-profile-campus') != null) {
		pcom_info.append( profile.querySelector('.pcom-profile-campus') );
	}
	else {
		const reCampus = /(?:Moultrie|Philadelphia|Suwanee) [Cc]ampus/gm;
		for(e of profile.querySelectorAll('.s-lib-profile-contact div')) {
			if(reCampus.test(e.innerText.trim())) {
				div = document.createElement('DIV');
				div.classList.add('pcom-profile-campus');
				div.innerText = e.innerText.trim();
				pcom_info.appendChild(div);
			}
		}
	}
	
	// mail
	let mail = profile.querySelector('.s-lib-profile-email a');
	if(mail != null) {
		div = document.createElement('DIV');
		div.classList.add('pcom-profile-email');
		a = document.createElement('A');
		a.setAttribute('href',mail.getAttribute('href'));
		a.innerText = mail.getAttribute('title');
		div.appendChild(a);
		pcom_info.appendChild(div);
	}
	
	// phone
	const rePhone = /[0-9]{3}-[0-9]{3}-[0-9]{4}/gm;
	for(e of profile.querySelectorAll('.s-lib-profile-contact div')) {
		if(rePhone.test(e.innerText.trim())) {
			div = document.createElement('DIV');
			div.classList.add('pcom-profile-phone');
			a = document.createElement('A');
			a.setAttribute('href','tel:' + e.innerText.trim());
			a.innerText = e.innerText.trim();
			div.appendChild(a);
			pcom_info.appendChild(div);
		}
	}
	
	librarians_box.querySelector('.s-lib-box-content div').appendChild(pcom_profile);
}
	
