import React, { useState } from 'react';

export const TheContext = React.createContext(null);

export const GeneralContext = ({ children }) => {
	const [modal, setModal] = useState(false);
	const [modalEditable, setModalEditable] = useState({
		editable: false,
		nameEditable: undefined,
		priceEditable: undefined,
		amountEditable: 1,
	});
	const [products, setProducts] = useState([]);

	const handleClickModal = () => setModal(!modal);
	return (
		<TheContext.Provider
			value={{
				modal,
				setModal,
				handleClickModal,
				products,
				setProducts,
				modalEditable,
				setModalEditable,
			}}
		>
			{children}
		</TheContext.Provider>
	);
};
