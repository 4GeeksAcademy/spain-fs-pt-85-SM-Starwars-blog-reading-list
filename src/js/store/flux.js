import { CharacterDetails } from "../views/character-details";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			characterSpecificDetails: [],
			favourites: [{
				"key": "1",
				"name": "Luke",
				"uid": "1"
			}]
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
					const store = getStore();
					setStore({ ...store, characters: [...store.characters, ...data.results] })
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			getCharacterInfoViaApi: async function getCharacterInfoViaApi(uid) {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${uid}`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data, "esta info interesaAAAAAAAA");
					const store = getStore();
					await setStore({ ...store, characterSpecificDetails: data });
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			// funcion para añadir elementos a la lista de favoritos
			addFavourite: function addFavourite(targetItem) {
				const store = getStore();
				const name = targetItem.name;
				const uid = targetItem.uid;
				for (let i = 0; i < store.favourites.length; i++) {
					if (store.favourites[i].uid === targetItem.uid) return;
				}
				setStore({ ...store, favourites: [...store.favourites, { "key": uid, "name": name, "uid": uid }] })
			},
			// función para eliminar elementos de la lista de favoritos
			deleteFavourite: function deleteFavourite(itemToDelete) {
				const store = getStore();
				const newFavouriteArr = store.favourites.filter(item =>
					item.uid !== itemToDelete.uid
				);
				setStore({ ...store, favourites: newFavouriteArr })
			}
		}
	};
};

export default getState;
