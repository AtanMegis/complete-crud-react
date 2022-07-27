import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const INITIAL_STATE = {
	currentUser: null,
};

const Context = createContext(INITIAL_STATE);

export const useValue = () => {
	return useContext(Context);
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	return (
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
