const form = document.querySelector('form');
form.submit = null;

const unit = 'vw';
const re = /\d+(px)|\d+(.)\d+(px)/g;
const re2 = /\d+|\d+(.)\d+/g;
const re3 = /{|}|px/g;

function getValueVw(value, screen) {
	return value / screen * 100 + 'vw';
}

form.addEventListener('submit', function (e) {
	e.preventDefault();

	let formData = {
		i: form.i.value.split(" "),
		screen: parseInt(form.screen.value.trim()),
	};
	const o = form.o;
	const o2 = form.o2;
	let curVal = form.i.value.split('\n');
	let newStylesArray = [];

	curVal.forEach(el => {
		if (el.match(re3)) {
			newStylesArray.push(el);
		}
	})

	for (let i = 0; i < formData.i.length; ++i) {
		if (formData.i[i].match(re)) {
			let oldValue = formData.i[i].match(re).toString();
			let temp = parseFloat(formData.i[i].match(re2).toString());
			formData.i[i] = formData.i[i].replaceAll(oldValue, getValueVw(temp, formData.screen));
		}
	}

	o.textContent = formData.i.join(' ');
	o2.textContent = newStylesArray.join('\n');
})