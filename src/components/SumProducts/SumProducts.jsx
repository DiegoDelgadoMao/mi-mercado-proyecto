import { useContext, useState } from 'react';
import { TheContext } from '../../context/GeneralContext';
import './sumProducts.css';

const stringToNumber = string => {
	let cantidadCeros = 0;
	let valor = string.split('');

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
	let numeros = Number(cadena);

	return numeros;
};

const numberToString = number => {
	let conversion = number.toString();
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
};

export const SumProducts = () => {
	const { products } = useContext(TheContext);

	const numbers = products.map(item => {
		let value = stringToNumber(item.priceProduct);
		return value * item.amountProduct;
	});

	let sum = 0;

	if (numbers.length >= 2) {
		sum = numbers.reduce(
			(previousValue, currentValue) => previousValue + currentValue
		);
	} else if (numbers.length === 1) {
		sum = numbers[0];
	}

	return (
		<div className='sumOfProducts'>
			<h2>Total De las compras:</h2>
			<span>${numberToString(sum)}</span>
		</div>
	);
};
