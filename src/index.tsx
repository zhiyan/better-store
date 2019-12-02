import React, {ReactNode} from 'react';


export type Dict = {
	[key: string]: any
}

export interface ProviderProps {
	children: ReactNode,
}

const GlobalContext = React.createContext<any>(null);

const cache: Dict= {}

export function createStore(
	name: string,
	useHook: () => any,
){
	cache[name] = {
		useHook,
	};
}

export function useStore(store?: string | Function){
	const value = React.useContext(GlobalContext);

	if (value === null) {
		throw new Error("Component must be wrapped with <Provider>")
	}

	if(!store){
		return value;
	}

	if(typeof store === 'function'){
		return store(value);
	}

	return value[store];
}

function useGlobalStore(){
	const keys = Object.keys(cache);
	const globalStore: Dict = {};
	
	for(const key of keys){
		globalStore[key] = cache[key].useHook();
	}

	return globalStore;
}

export function Provider(props: ProviderProps){
	const value = useGlobalStore();
	return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
}