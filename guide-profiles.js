window.addEventListener('load', function(event) { 
	let profiles = document.querySelectorAll('.s-lib-profile-container');
	
	if(document.URL.includes('admin_c.php'))
		return;
	
	// test for existence of the profiles
	if(!document.body.classList.contains('pcom-guide') || profiles.length == 0)
		return;

	// hide the existing profiles
	for(e of profiles)
		e.closest('[id^=s-lg-box-wrapper-]').style.display = 'none';

	// create replacement
	let librarians_box = htmlToElement('<div id="pcom-librarians-box"><div class="s-lib-box-container"><div class="s-lib-box s-lib-box-std"><h2 class="s-lib-box-title">Librarian</h2><div><div class="s-lib-box-content"><div></div></div></div></div>');

	let text = 'Librarian';
	if(profiles.length == 1)
		librarians_box.querySelector('h2').innerText = text;
	else
		librarians_box.querySelector('h2').innerText = text + 's';

	for(p of profiles) {
		let a, div, img;
		let pcom_profile = htmlToElement('<div class="pcom-profile-box"><div class="info-holder"></div><div class="image-holder"></div></div>');
		let pcom_info = pcom_profile.querySelector('.info-holder'); 
		
		// link
		a = document.createElement('A');
		a.setAttribute('href', p.querySelector('a').getAttribute('href'));
		a.innerText = p.querySelector('.s-lib-profile-name').innerText.trim();
		let h3 = htmlToElement('<h3 class="pcom-profile-heading"></h3>');
		h3.appendChild(a);
		pcom_info.appendChild( h3 );
		
		// image
		div = document.createElement('DIV');
		div.classList.add('pcom-profile-image');
		div.appendChild(p.querySelector('.s-lib-profile-image img'));
		pcom_profile.querySelector('.image-holder').appendChild(div);
		
		// pronouns
		let pronouns = p.querySelector('.s-lib-profile-pronouns').innerText.trim();
		if(pronouns.length > 0) {
			div = document.createElement('DIV');
			div.classList.add('pcom-profile-pronouns');
			div.innerText = ' (' + pronouns + ')';
			pcom_info.appendChild(div);
		}
		
		// campus 
		if(p.querySelector('.pcom-profile-campus') != null)
			pcom_info.append( p.querySelector('.pcom-profile-campus') );
		
		// mail
		let mail = p.querySelector('.s-lib-profile-email a');
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
		const re = /[0-9]{3}-[0-9]{3}-[0-9]{4}/gm;
		for(e of p.querySelectorAll('.s-lib-profile-contact div')) {
			if(re.test(e.innerText.trim())) {
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

	document.querySelector('#s-lg-col-0 .s-lg-col-boxes').prepend(librarians_box);

});

