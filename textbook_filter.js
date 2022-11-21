let courses = [];
let departments = [];
let campuses = [];
let numbers = [];
let levels = [];

// for local storage: grab name of page and store as textbook-NAME-filter, json of the object. 

window.addEventListener('load', function(event) {
	if(document.location.href.indexOf('admin_c.php') != -1)
		return;
	
	if(!document.getElementById('textbookForms-heading'))
		return;
	
	// LOAD CURSE INFORMATION 
	let re = /([A-Za-z]+) ([0-9]+[A-Z]{0,2})( \([A-Z]+\))?:/
	let h2 = document.querySelectorAll('#s-lg-col-1 h2.s-lib-box-title');
	for(h of h2) {
		if(h.innerText != 'Filter Courses') {
			let c = {};
			
			c.full = h.innerText.trim();
			let matches = c.full.match(re);
			c.department = matches[1];			
			c.number = matches[2];
			c.level = 100 * Math.floor(parseInt(c.number) / 100);
			
			
			c.campus = matches[3];
			if(matches[3]) 
				c.campus = c.campus.trim().replace('(','').replace(')','');
			
			c.name = c.full.substring(c.full.indexOf(': ') + 2);
			c.box = h.parentNode.parentNode.parentNode;
			courses.push(c);
			
			if(departments.indexOf(c.department) == -1)
				departments.push(c.department);
			
			if(numbers.indexOf(c.number) == -1)
				numbers.push(c.number);
			
			if(typeof c.campus != 'undefined' && campuses.indexOf(c.campus) == -1)
				campuses.push(c.campus);
			
			if(levels.indexOf(c.level) == -1)
				levels.push(c.level);
		}
	}
	campuses = campuses.sort();
	numbers = numbers.sort();
	departments = departments.sort();
	levels = levels.sort();
	
	// CREATE FILTER FORM
	let form = document.getElementById('filterForm-fields');
	// campuses
	let campusHtml = htmlToElement('<div><label for="campus_select">Campus:</label><select id="campus_select"><option value="" selected>All</option></<select></div>');
	for(c of campuses) {
		if(typeof c == 'undefined')
			continue;
		let opt = document.createElement('OPTION');
		opt.setAttribute('value', c);
		opt.innerText = c;
		campusHtml.querySelector('select').append(opt);
	}
	if(campuses.length == 0) {
		campusHtml.style.display = 'none'; 
	}
	
	// departments
	let deptHtml = htmlToElement('<div><label for="dept_select">Department:</label><select id="dept_select"><option value="" selected>All</option></<select></div>');
	for(d of departments) {
		let opt = document.createElement('OPTION');
		opt.setAttribute('value', d);
		opt.innerText = d;
		deptHtml.querySelector('select').append(opt);
	}
	if(departments.length == 1) {
		deptHtml.style.display = 'none'; 
	}

	// course level
	let levelHtml = htmlToElement('<div><label for="level_select">Course Level:</label><select id="level_select"><option value="" selected>All</option></<select></div>');
	for(c of levels) {
		let opt = document.createElement('OPTION');
		if(c == 0) {
			opt.setAttribute('value', '0');
			opt.innerText = '000s';
		}
		else {
			opt.setAttribute('value', c);
			opt.innerText = c + 's';
		}
		levelHtml.querySelector('select').append(opt);
	}
	if(levels.length == 1) {
		levelHtml.style.display = 'none'; 
	}
	
	// contains filter
	let textHtml = htmlToElement('<div><label for="text_filter">Contains:</label><input type="text" id="text_filter" value=""></div>');
	
	form.appendChild(campusHtml);
	form.appendChild(deptHtml);
	form.appendChild(levelHtml);
	form.appendChild(textHtml);
	

	// CREATE SELECT FORM
	form = document.querySelector('#selectForm fieldset');
	for(c of courses) {
		let label = htmlToElement('<div><label><input type="checkbox" checked><span></span></div>');
		label.querySelector('span').innerText = c.full;
		label.querySelector('input').id = 'checkbox-' + c.box.id;
		c.checkbox = label.querySelector('input');
		form.appendChild(label);
	}

	// CHECK FOR SAVED SETTINGS
	let saveKey = generateSaveKey();
	if(localStorage.getItem(saveKey)) {
		loadSavedSettings(saveKey);
	}
	else {
		// update display count on page load
		updateDisplayCounts(courses.length, 0);	
	}
	// show the forms
	document.getElementById('textbookForms-container').removeAttribute('style');

	// submit event listeners
	document.getElementById('filterForm').addEventListener('submit', function(evt) {
		evt.preventDefault();
		filterCourses();
	});
	document.getElementById('selectForm').addEventListener('submit', function(evt) {
		evt.preventDefault();
		selectCourses();
	});
	
	// reset event listeners
	document.getElementById('filter_reset').addEventListener('click', function(evt) {
		for(c of courses) {
			c.box.classList.remove('filter_textbooks_hidden');
		}
		// display counts
		updateDisplayCounts(courses.length, 0);
		
		//reset the other form
		document.getElementById('selectForm').reset();
	});	
	document.getElementById('select_reset').addEventListener('click', function(evt) {
		for(c of courses) {
			c.box.classList.remove('filter_textbooks_hidden');
			c.checkbox.checked = true;
		}
		// display counts
		updateDisplayCounts(courses.length, 0);
		
		//reset the other form
		document.getElementById('filterForm').reset();
	});
	
	// save event listeners
	document.getElementById('filter_save').addEventListener('click', function(evt) {
		let saveKey = generateSaveKey();
		let saveInfo = {};
		saveInfo.saveType = 'filter';
		saveInfo.campus = document.getElementById('campus_select').value;
		saveInfo.department = document.getElementById('dept_select').value;
		saveInfo.level = document.getElementById('level_select').value;
		saveInfo.contains = document.getElementById('text_filter').value;
		
		localStorage.setItem(saveKey, JSON.stringify(saveInfo));
	});
	
	document.getElementById('select_save').addEventListener('click', function(evt) {
		let saveKey = generateSaveKey();
		let saveInfo = {};
		saveInfo.saveType = 'select';
		saveInfo.checkboxes = [];
		for(c of courses) {
			saveInfo.checkboxes.push({'course': c.full, 'checkbox': c.checkbox.id, 'checked': c.checkbox.checked})
		}
		
		localStorage.setItem(saveKey, JSON.stringify(saveInfo));
	});
});

function updateDisplayCounts(visibility_count, hidden_count) {
	if(visibility_count == 1)
		document.getElementById('textbook_display_results').innerText = 'Showing 1 course (' + hidden_count + ' hidden)';
	else
		document.getElementById('textbook_display_results').innerText = 'Showing ' + visibility_count + ' courses (' + hidden_count + ' hidden)';
}

function filterCourses() {
	let i, visibility;
	let visibility_count = 0;
	let hidden_count = 0;
	for(i=0; i<courses.length; i++) {
		visibility = true;
		let c = courses[i];
	
		// campus 
		val = document.getElementById('campus_select').value;
		if(val != '' && val != c.campus)
			visibility = false;
		
		// department
		val = document.getElementById('dept_select').value;
		if(val != '' && val != c.department)
			visibility = false;
		
		// level 
		val = document.getElementById('level_select').value;
		if(val != '' && val != ('' + c.level))
			visibility = false;
		
		// contains
		val = document.getElementById('text_filter').value.trim().toLowerCase();
		console.log(val, c.full.toLowerCase(), c.full.toLowerCase().includes(val));
		if(val != '' && !c.full.toLowerCase().includes(val))
			visibility = false;
		
		if(visibility) {
			c.box.classList.remove('filter_textbooks_hidden');
			c.checkbox.checked = true;
			visibility_count += 1;
		}
		else {
			c.box.classList.add('filter_textbooks_hidden');
			c.checkbox.checked = false;
			hidden_count += 1;
		}
	}

	// update display count
	updateDisplayCounts(visibility_count, hidden_count);
}

function selectCourses() {
	let visibility_count = 0;
	let hidden_count = 0;
	
	for(c of courses) {
		if(c.checkbox.checked) {
			c.box.classList.remove('filter_textbooks_hidden');
			visibility_count += 1;
		}
		else {
			c.box.classList.add('filter_textbooks_hidden');
			hidden_count += 1;
		}
	}
	
	// update display count
	updateDisplayCounts(visibility_count, hidden_count);
}

function generateSaveKey() {
	return 'PCOM Textbooks ' + document.querySelector('#s-lg-guide-tabs a.active').innerText.trim();
}

function loadSavedSettings(saveKey) {
	let json = JSON.parse(localStorage.getItem(saveKey));
	if(json.saveType == 'filter') {
		let select;
		
		// campus
		select = document.getElementById('campus_select');
		if(select && select.querySelector('option[value="' + json.campus + '"]'))
			select.value = json.campus;
		
		// department
		select = document.getElementById('dept_select');
		if(select && select.querySelector('option[value="' + json.department + '"]'))
			select.value = json.department;
		
		// level
		select = document.getElementById('level_select');
		if(select && select.querySelector('option[value="' + json.level + '"]'))
			select.value = json.level;
		
		// contains
		document.getElementById('text_filter').value = json.contains;
		
		filterCourses();
		document.getElementById('textbookFilterForm-filter').click();
	}
	else if(json.saveType == 'select') {
		for(cb of json.checkboxes) { 
			let checkbox = document.getElementById(cb.checkbox);
			let span = checkbox.nextElementSibling;
			if(span.innerText ==  cb.course )
				checkbox.checked = cb.checked;
		}
		selectCourses();
		document.getElementById('textbookFilterForm-select').click();
	}
}