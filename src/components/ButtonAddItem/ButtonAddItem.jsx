import React, { useContext } from 'react';

import './buttonAddItem.css';
import { BiListPlus } from 'react-icons/bi';

import { TheContext } from '../../context/GeneralContext';

export const ButtonAddItem = () => {
	const styleButton = {
		fontSize: '4rem',
		color: '#fafafa',
	};

	const { handleClickModal } = useContext(TheContext);

	return (
		<button onClick={() => handleClickModal()} className='buttonAddItem'>
			<BiListPlus style={styleButton} />
		</button>
	);
};
