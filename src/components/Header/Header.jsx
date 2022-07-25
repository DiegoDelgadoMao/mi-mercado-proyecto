import React from 'react';
import logo from '../../assets/logo-mi-mercado.svg';

import './header.css';

export const Header = () => {
	return (
		<header>
			<img className='logo-img' src={logo} />
		</header>
	);
};
