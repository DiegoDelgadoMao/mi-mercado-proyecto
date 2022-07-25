import { useContext } from 'react';
import './mainContent.css';
import { BiRightArrowAlt, BiX } from 'react-icons/bi';
import { TheContext } from '../../context/GeneralContext';
import { BiEdit } from 'react-icons/bi';

export const MainContent = () => {
	const { products, setProducts, setModalEditable } = useContext(TheContext);
	const stylesBaseIcons = {
		position: 'absolute',
		cursor: 'pointer',
	};
	const stylesIconX = {
		right: '-12px',
		fontSize: '3rem',
		top: '10px',
		color: '#ff3232',
	};
	const stylesIconEdit = {
		right: '-10px',
		fontSize: '2.6rem',
		top: '42px',
		color: '#8dff32',
	};
	const deletProduct = productToDelete => {
		const productsNews = products.filter(
			item => item.productName !== productToDelete.productName
		);
		setProducts(productsNews);
	};
	const editProduct = productToEdit => {
		setModalEditable({
			editable: true,
			nameEditable: productToEdit.productName,
			priceEditable: productToEdit.priceProduct,
			amountEditable: productToEdit.amountProduct,
		});
	};
	return (
		<main>
			<div className='subTitles-products'>
				<h2>Producto</h2>
				<h2>Precio</h2>
				<h2>Cantidad</h2>
			</div>
			<div className='container-products'>
				{products.map(item => {
					return (
						<div key={item.productName} className='container-products__items'>
							<h3>{item.productName}</h3>
							<BiRightArrowAlt />
							<p>${item.priceProduct}</p>
							<BiRightArrowAlt />
							<span>{item.amountProduct}</span>
							<BiX
								onClick={() => deletProduct(item)}
								style={{ ...stylesIconX, ...stylesBaseIcons }}
							/>
							<BiEdit
								onClick={() => editProduct(item)}
								style={{ ...stylesIconEdit, ...stylesBaseIcons }}
							/>
						</div>
					);
				})}
			</div>
		</main>
	);
};
