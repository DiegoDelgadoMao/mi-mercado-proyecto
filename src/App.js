import './App.css';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { ButtonAddItem } from './components/ButtonAddItem/ButtonAddItem';

import { GeneralContext } from './context/GeneralContext';
import { MainContent } from './components/MainContent/MainContent';
import { SumProducts } from './components/SumProducts/SumProducts';
import { EmptyCart } from './components/emptyCart/EmptyCart';

function App() {
	return (
		<GeneralContext>
			<Header />
			<MainContent />
			<EmptyCart />
			<SumProducts />
			<ButtonAddItem />
			<Modal />
		</GeneralContext>
	);
}

export default App;
