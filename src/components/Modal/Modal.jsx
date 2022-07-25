import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';

import './modal.css';
import { TheContext } from '../../context/GeneralContext';

const initialState = {
	items: { amountProduct: 1 },
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM_NAME':
			if (!state.items.productName) {
				return {
					items: {
						...state.items,
						productName: action.payload,
					},
				};
			} else {
				state.items.productName = action.payload;
				return { items: state.items };
			}
			break;
		case 'ADD_ITEM_PRICE':
			if (!state.items.priceProduct) {
				return {
					items: {
						...state.items,
						priceProduct: action.payload,
					},
				};
			} else {
				state.items.priceProduct = action.payload;
				return { items: state.items };
			}
			break;
		case 'ADD_AMOUNT_OF_PRODUCT':
			if (!state.items.amountProduct) {
				return {
					items: {
						...state.items,
						amountProduct: action.payload,
					},
				};
			} else {
				state.items.amountProduct = action.payload;
				return { items: state.items };
			}
			break;
		default:
			return {
				items: { amountProduct: 1 },
			};
	}
};

export const Modal = () => {
	const {
		modal,
		setModal,
		modalEditable,
		setModalEditable,
		products,
		setProducts,
	} = useContext(TheContext);

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleClickModal = () => {
		dispatch({ type: 'END' });
		if (modalEditable.editable) {
			setModalEditable({ ...modalEditable, editable: false });
		} else {
			setModal(!modal);
		}
		const inputs = document.querySelectorAll('.inputs-forms');
		inputs.forEach(input => (input.value = ''));
	};

	const updateProducts = event => {
		event.preventDefault();
		if (modalEditable.editable) {
			const updateProductsEditables = products.map(product => {
				if (product.productName === modalEditable.nameEditable) {
					return state.items;
				} else {
					return product;
				}
			});
			setProducts(updateProductsEditables);
			dispatch({ type: 'END' });
			setModalEditable({ ...modalEditable, editable: false });
		} else {
			setProducts([...products, state.items]);
			dispatch({ type: 'END' });
			setModal(!modal);
		}
		const inputs = document.querySelectorAll('.inputs-forms');
		inputs.forEach(input => (input.value = ''));
	};

	const writeNameProduct = event => {
		let currentValue = event.target.value;
		if (currentValue.length > 40) {
			document.getElementById('inputNamaeProduct').value = currentValue.slice(
				0,
				40
			);
		}
		dispatch({ type: 'ADD_ITEM_NAME', payload: currentValue });
	};

	const writePriceOfProduct = event => {
		const currentValue = event.target.value;
		dispatch({ type: 'ADD_ITEM_PRICE', payload: currentValue });
		let regExp = /[a-z]|[^ . 0-9]/g;
		let find = currentValue.search(regExp);

		if (find !== -1) {
			event.target.classList.add('inputError');
		} else {
			event.target.classList.remove('inputError');
		}
	};

	const writeAmountOfProduct = event => {
		let currentValue = event.target.value;
		if (!currentValue || currentValue === '0') {
			currentValue = '1';
		}
		dispatch({ type: 'ADD_AMOUNT_OF_PRODUCT', payload: currentValue });
	};

	return ReactDOM.createPortal(
		<div
			className={`background-modal ${
				!(modal || modalEditable.editable) && 'hiddenElement'
			}`}
		>
			<form onSubmit={updateProducts} className='container-modal'>
				<label>Nombre del producto</label>
				<input
					required
					id='inputNamaeProduct'
					className='inputs-forms'
					onChange={writeNameProduct}
					placeholder={
						modalEditable.editable ? modalEditable.nameEditable : 'palomita'
					}
					type='text'
				/>
				<label>Precio del producto</label>
				<input
					required
					id='priceProduct'
					className='inputs-forms'
					onChange={writePriceOfProduct}
					type='text'
					placeholder={
						modalEditable.editable ? modalEditable.priceEditable : '3.000'
					}
				/>
				<label>Cantidad</label>
				<input
					className='inputs-forms'
					onChange={writeAmountOfProduct}
					type='number'
					placeholder={
						modalEditable.editable ? modalEditable.amountEditable : '1'
					}
				/>
				<div className='modal-buttons'>
					<button type='button' onClick={() => handleClickModal()}>
						Cancelar
					</button>
					<button>
						{modalEditable.editable
							? 'Actualizar producto'
							: 'Agregar a la lista'}
					</button>
				</div>
			</form>
		</div>,
		document.getElementById('modal')
	);
};
