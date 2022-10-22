window.addEventListener('load', function(event) { 
	if(document.URL.includes('admin_c.php'))
		return;

	let boxes = document.querySelectorAll('#s-lg-col-1 h2.s-lib-box-title');
	let moveFocusFlag = false;
	let loc = window.location;
	let reID = /[^A-Za-z0-9_\-\:\.]/g;
	let reBlank = /[ ]{2,}/g;
	for(e of boxes) {
		let txt = e.innerText.trim();
		let eID = txt.replaceAll(reID,' ');
		eID = eID.replaceAll(reBlank,' ');
		eID= eID.trim().replaceAll(' ','_');
		
		e.setAttribute('id',eID);
		
		console.log(eID,window.location.hash, moveFocusFlag);
		if(loc.hash == ('#' + eID))
			moveFocusFlag = true;
		
		let a = htmlToElement('<a href="" class="pcom-box-anchor"><span class="sr-only"></span><span aria-hidden="true" class="fa fa-hashtag"></span></a>');
		a.querySelector('span.sr-only').innerText = 'Anchor for ' + txt;

		let href = loc.origin + loc.pathname + loc.search + '#' + eID;
		a.setAttribute('href',href);
		e.insertAdjacentElement('afterend', a);
	}
	
	// force a move 
	if(moveFocusFlag)
		loc.hash = loc.hash;
});