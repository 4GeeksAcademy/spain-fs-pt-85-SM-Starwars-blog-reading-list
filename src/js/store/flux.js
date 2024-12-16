import { CharacterDetails } from "../views/character-details";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			characterSpecificDetails: []
		},
		actions: {
			getCharacters: async function getCharactersViaApi() {
				try {
					const response = await fetch("https://www.swapi.tech/api/people", {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					setStore({characters: data.results})
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},
			
			getCharacterInfoViaApi: async function getCharacterInfoViaApi(url) {
				try {
					const response = await fetch(`${url}`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data, "esta info interesaAAAAAAAA");
					const store = getStore();
					await setStore({...store, characterSpecificDetails: data});
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
