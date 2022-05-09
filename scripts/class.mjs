import {
	requiredParam,
	CreateElements,
	ItemListFactory,
} from './functions/createItems.mjs';

import { dataConversion, validationInput } from './functions/general.mjs';

class Item {
	constructor({ parent = requiredParam('containerPrent') }) {
		this.containerParent = parent;
	}

	addItem() {
		let item = new ItemListFactory({
			containerParent: this.containerParent,
		}).createItemsList();

		ItemsFunctionalities.runButtonsToDelete();
		ItemsFunctionalities.limitStringName();
		ItemsFunctionalities.runInputPrice();
		ItemsFunctionalities.runAmountInput();
		ItemsFunctionalities.itemsLabeled();
	}
	removeItem(itemToRemove) {
		if (this.containerParent.contains(itemToRemove)) {
			this.containerParent.removeChild(itemToRemove);

			ItemsFunctionalities.sumValues();
		}
	}
}

class ItemsFunctionalities {
	constructor() {}

	static limitStringName() {
		const elementsUlList = document.querySelectorAll('.name-item');

		elementsUlList.forEach(e => {
			e.addEventListener('keyup', () => {
				let nameItem = e.textContent;
				let maxLetter = 16;

				if (window.screen.width < 500) {
					maxLetter = 11;
				}

				if (nameItem.length > maxLetter) {
					e.setAttribute('contenteditable', 'false');

					let stringTransform = nameItem.slice(0, -1);
					e.textContent = stringTransform;
				}
				e.setAttribute('contenteditable', 'true');
			});
		});
	}

	static runInputPrice() {
		const inputsWithPrice = document.querySelectorAll('.price-input');

		inputsWithPrice.forEach(element => {
			element.addEventListener('keyup', () => {
				this.sumValues();
			});
		});
	}

	static runAmountInput() {
		const inputsWithAmount = document.querySelectorAll('.amount-input');

		inputsWithAmount.forEach(element => {
			element.addEventListener('keyup', () => {
				this.sumValues();
			});
		});
	}

	static runButtonsToDelete() {
		const elementsToRemove = document.querySelectorAll('.button-remove-item');

		elementsToRemove.forEach(element => {
			element.addEventListener('click', () => {
				let elementToRemove = element.parentElement;
				createItem.removeItem(elementToRemove);
			});
		});
	}

	static sumValues() {
		const ElementsWithValue = document.querySelectorAll('.price-input');

		const values = [];
		ElementsWithValue.forEach(e => {
			let valueInput = e.value;
			let productAmount = e.nextSibling.nextSibling.value;

			let validation = validationInput(valueInput, e);

			if (valueInput.length > 0 && validation) {
				let value = dataConversion().transform(valueInput);

				if (productAmount.length > 0) {
					productAmount = dataConversion().transform(productAmount);
				} else {
					productAmount = 1;
				}

				value = productAmount * value;
				values.push(value);
			}
		});

		let totalSum = 0;

		if (values.length >= 2) {
			let operationResult = values.reduce(
				(previousValue, currentValue) => previousValue + currentValue
			);
			totalSum = operationResult;
		} else if (values.length === 1) {
			totalSum = values[0];
		}

		let transformNumberToString = dataConversion({
			stringTransform: false,
			numberTransform: true,
		}).transform(totalSum);

		const elementToPrintResult = document.getElementById('print-resul-sum');
		elementToPrintResult.textContent = transformNumberToString;
	}

	static itemsLabeled() {
		const amountItems = document.querySelectorAll('.name-item');

		amountItems.forEach(element => {
			element.parentElement.addEventListener('dblclick', () => {
				element.classList.toggle('labeled');
			});
		});
	}
}

const containeritemsList = document.getElementById('container-items');

let createItem = new Item({ parent: containeritemsList });

export { Item, ItemsFunctionalities, createItem };
