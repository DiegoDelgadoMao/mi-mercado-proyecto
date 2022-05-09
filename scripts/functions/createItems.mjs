function requiredParam(param) {
	throw new Error(`propiedad obligatoria: ${param}, por favor ingresela`);
}

class CreateElements {
	constructor({
		nameElement = requiredParam('nameElement'),
		nameClass = undefined,
	}) {
		this.element = nameElement;
		this.class = nameClass;
	}

	creating() {
		let elementCreate;
		if (this.class !== undefined) {
			elementCreate = document.createElement(this.element);
			elementCreate.classList.add(this.class);
		} else {
			elementCreate = document.createElement(this.element);
		}

		return elementCreate;
	}
}

class ItemListFactory {
	constructor({ containerParent = requiredParam('containerParent') }) {
		this.containerParent = containerParent;
	}

	createItemsList() {
		const divContainer = new CreateElements({
			nameElement: 'DIV',
			nameClass: 'container-list-items__item',
		}).creating();

		// creacion de los items

		// primer item

		const ulItem = new CreateElements({
			nameElement: 'UL',
		}).creating();

		const liItem = new CreateElements({
			nameElement: 'LI',
		}).creating();

		liItem.setAttribute('contenteditable', 'true');
		liItem.textContent = 'Arroz';

		liItem.setAttribute('class', 'name-item');

		ulItem.appendChild(liItem);

		// segundo item

		const icon = new CreateElements({
			nameElement: 'I',
			nameClass: 'ri-arrow-right-fill',
		}).creating();

		const icon2 = new CreateElements({
			nameElement: 'I',
			nameClass: 'ri-arrow-right-fill',
		}).creating();

		// tercer item

		const inputOne = new CreateElements({
			nameElement: 'INPUT',
			nameClass: 'price-input',
		}).creating();

		inputOne.setAttribute('type', 'text');
		inputOne.setAttribute('placeholder', '8.500');
		inputOne.setAttribute('placeholder', '8.500');

		// cuarto

		const inputTwo = new CreateElements({
			nameElement: 'INPUT',
			nameClass: 'amount-input',
		}).creating();

		inputTwo.setAttribute('type', 'number');
		inputTwo.setAttribute('placeholder', '2');

		// quinto

		const buttonDeletedItem = new CreateElements({
			nameElement: 'BUTTON',
		}).creating();
		buttonDeletedItem.setAttribute('class', 'button-remove-item');

		const iconButtonDeleted = new CreateElements({
			nameElement: 'I',
			nameClass: 'ri-delete-bin-5-fill',
		}).creating();

		buttonDeletedItem.appendChild(iconButtonDeleted);
		// se agrega el item a el contenedor padre

		divContainer.appendChild(ulItem);
		divContainer.appendChild(icon);
		divContainer.appendChild(inputOne);
		divContainer.appendChild(icon2);
		divContainer.appendChild(inputTwo);
		divContainer.appendChild(buttonDeletedItem);

		this.containerParent.appendChild(divContainer);

		return this.containerParent;
	}
}

export { requiredParam, CreateElements, ItemListFactory };
