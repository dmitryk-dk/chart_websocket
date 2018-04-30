import { app } from 'hyperapp';
import store from './store';
import actions from './actions';
import view from './App';
import ws from './websocket';
import dispacther from './websocket/dispacther'; 

const wiredActions = app(store, actions(ws), view, document.body);

dispacther(ws, wiredActions);

