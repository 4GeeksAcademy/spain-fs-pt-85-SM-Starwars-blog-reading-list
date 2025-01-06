import { CharacterDetails } from "../views/character-details";
import "../../img/404 image not found.jpg"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			characterSpecificDetails: [],
			vehicles: [],
			vehicleSpecificDetails: [],
			planets: [],
			planetSpecificDetails: [],
			favourites: [],
			characterImages: []
		},
		actions: {
			getCharacterImages: async function getCharacterImages() {
				try {
					const response = await fetch("https://akabab.github.io/starwars-api/api/all.json", {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					const store = getStore();
					setStore({...store, characterImages: data})
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			getSpecificCharacterImage: function getSpecificCharacterImage(character) {
				const store = getStore();
				for (let i = 0; i < store.characterImages.length; i++){
					if (character.name == store.characterImages[i].name) {
						return store.characterImages[i].image;
					}
				}
				return "404 image not found.jpg";
				
			},

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

			getVehicles: async function getVehiclesViaApi() {
				try {
					const response = await fetch("https://www.swapi.tech/api/vehicles", {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					const store = getStore();
					setStore({ ...store, vehicles: [...store.vehicles, ...data.results] })
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			getVehicleInfoViaApi: async function getVehiclesInfoViaApi(uid) {
				try {
					const response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data, "esta info vehículos");
					const store = getStore();
					await setStore({ ...store, vehicleSpecificDetails: data });
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			getPlanets: async function getPlanetsViaApi() {
				try {
					const response = await fetch("https://www.swapi.tech/api/planets", {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					const store = getStore();
					setStore({ ...store, planets: [...store.planets, ...data.results] })
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			getPlanetInfoViaApi: async function getPlanetsInfoViaApi(uid) {
				try {
					const response = await fetch(`https://www.swapi.tech/api/planets/${uid}`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data, "esta info planetas");
					const store = getStore();
					await setStore({ ...store, planetSpecificDetails: data });
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			// funcion para añadir elementos a la lista de favoritos
			addFavourite: function addFavourite(targetItem, typeOfItem) {
				const store = getStore();
				const name = targetItem.name;
				const uid = targetItem.uid;
				for (let i = 0; i < store.favourites.length; i++) {
					if ((store.favourites[i].uid && store.favourites[i].type) === (targetItem.uid && targetItem.type)) return;
				}
				setStore({ ...store, favourites: [...store.favourites, { "key": name, "name": name, "type": typeOfItem ,"uid": uid }] })
			},
			// función para eliminar elementos de la lista de favoritos
			deleteFavourite: function deleteFavourite(itemToDelete) {
				const store = getStore();
				const newFavouriteArr = store.favourites.filter(item =>
					item.key !== itemToDelete.key
				);
				setStore({ ...store, favourites: newFavouriteArr })
			}
		}
	};
};

export default getState;
