function dataConversion({
	stringTransform = true,
	numberTransform = false,
} = {}) {
	const stringToNumber = {
		transform(stringData) {
			let cantidadCeros = 0;
			let valor = stringData.split('');

			let arrayValor = valor.map(element => element);

			for (let caracter of arrayValor) {
				let indiceElemento = arrayValor.indexOf('0');
				if (indiceElemento !== -1) {
					cantidadCeros++;
					arrayValor.splice(indiceElemento, 1, '#');
				}

				if (caracter === '.') {
					let indiceElemento2 = arrayValor.indexOf('.');
					arrayValor.splice(indiceElemento2, 1);
				}
			}

			let cadena = arrayValor.toString().replaceAll(',', '');
			cadena = cadena.replaceAll('#', '0');
			let valueFinal = Number(cadena);

			return valueFinal;
		},
	};

	const numberToString = {
		transform(numberData) {
			let conversion = numberData.toString();
			let array = conversion.split('');

			if (conversion.length === 4) {
				array.splice(1, 0, '.');
			} else if (conversion.length === 5) {
				array.splice(2, 0, '.');
			} else if (conversion.length === 6) {
				array.splice(3, 0, '.');
			} else if (conversion.length === 7) {
				array.splice(1, 0, '.');
				array.splice(5, 0, '.');
			} else if (conversion.length === 8) {
				array.splice(2, 0, '.');
				array.splice(6, 0, '.');
			} else if (conversion.length === 9) {
				array.splice(3, 0, '.');
				array.splice(7, 0, '.');
			}

			const valueFInal = array.toString().replaceAll(',', '');
			return valueFInal;
		},
	};

	Object.freeze(stringToNumber);
	Object.seal(stringToNumber);

	Object.freeze(numberToString);
	Object.seal(numberToString);

	if (stringTransform) {
		return stringToNumber;
	} else {
		return numberToString;
	}
}

const validationInput = (stringValue, containerInput) => {
	let regExp = /[a-z]|[^ . 0-9]/g;
	let find = stringValue.search(regExp);

	if (find !== -1) {
		containerInput.classList.add('error');
		return false;
	} else {
		containerInput.classList.remove('error');
		return true;
	}
};

export { dataConversion, validationInput };
