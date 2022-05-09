import { Item, ItemsFunctionalities, createItem } from './class.mjs';

const buttonAddItems = document.getElementById('add-item');

buttonAddItems.addEventListener('click', () => createItem.addItem());
