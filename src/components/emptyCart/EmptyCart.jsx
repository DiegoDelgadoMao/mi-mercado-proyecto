import React, { useContext } from 'react';
import imgEmpty from '../../assets/empty-cart2.png';
import { TheContext } from '../../context/GeneralContext';
import './emptyCart.css';

export const EmptyCart = () => {
	const { products } = useContext(TheContext);
	return (
		<div
			className={(products.length && 'hiddenElement') || 'container-empty-cart'}
		>
			<h3>No tienes ningun producto en el carrito</h3>
			<img src={imgEmpty} alt='imagen de un carro vacio' />
		</div>
	);
};
