import { CharacterDetails } from "../views/character-details";
import "../../img/404 image not found.jpg"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			charactersPage: 1,
			isLoadingCharacters: false,
			characters: [],
			characterSpecificDetails: [],
			vehiclesPage: 1,
			isLoadingVehicles: false,
			vehicles: [],
			vehicleSpecificDetails: [],
			planetsPage: 1,
			isLoadingPlanets: false,
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

			imageUrlValidator: async function imageUrlValidator() {
				const store = getStore()
				await this.getCharacterImages()
				let updatedCharacterImageList = []
				for (const element of store.characterImages) {
					try {
						const response = await fetch(`${element.image}`);
						if (response.status == 200) {
							updatedCharacterImageList.push({
								name: element.name,
								image: element.image,
								status: "ok"
							})
						} else {
							updatedCharacterImageList.push({
								name: element.name,
								image: element.image,
								status: "not found"
							})
						}
					} catch (error) {
						updatedCharacterImageList.push({
							name: element.name,
							image: element.image,
							status: "not found"
						})
					}
				}
				setStore({...store, characterImages: updatedCharacterImageList})
			},

			getSpecificCharacterImage: function getSpecificCharacterImage(character) {
				const store = getStore();
				for (let i = 0; i < store.characterImages.length; i++){
					// console.log(store.characterImages[i].status);
					
					if (character.name == store.characterImages[i].name && store.characterImages[i].status == "ok") {
						return store.characterImages[i].image;
					}
				}
				return "404 image not found.jpg";
			},

			getCharacters: async function getCharactersViaApi() {
				const store = getStore();
				if (store.charactersPage > 9 || store.isLoadingCharacters) return;

				setStore({...store, isLoadingCharacters: true})
				try {
					const store = getStore();
					const response = await fetch(`https://www.swapi.tech/api/people?page=${store.charactersPage}&limit=10`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					setStore({ 
						...store, 
						characters: [...store.characters, ...data.results],
						charactersPage: store.charactersPage + 1,
						isLoadingCharacters: false
					})
					return;
				} catch (error) {
					console.log(error);
					setStore({...store, isLoadingCharacters: false})
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
				const store = getStore();
				if (store.vehiclesPage > 4 || store.isLoadingVehicles) return;
				setStore({...store, isLoadingVehicles: true})
				try {
					const store = getStore();
					const response = await fetch(`https://www.swapi.tech/api/vehicles?page=${store.vehiclesPage}&limit=10`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					setStore({
						...store, 
						vehicles: [...store.vehicles, ...data.results],
						vehiclesPage: store.vehiclesPage + 1,
						isLoadingVehicles: false
					})
					return;
				} catch (error) {
					console.log(error);
					setStore({...store, isLoadingVehicles: false})
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
					setStore({ ...store, vehicleSpecificDetails: data });
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			getPlanets: async function getPlanetsViaApi() {
				const store = getStore();
				if (store.planetsPage > 6 || store.isLoadingPlanets) return;
				setStore({...store, isLoadingPlanets: true})
				try {
					const store = getStore();
					const response = await fetch(`https://www.swapi.tech/api/planets?page=${store.planetsPage}&limit=10`, {
						method: "GET"
					})
					console.log(response);
					const data = await response.json();
					console.log(data);
					setStore({ 
						...store, 
						planets: [...store.planets, ...data.results],
						planetsPage: store.planetsPage + 1,
						isLoadingPlanets: false
					})
					return;
				} catch (error) {
					console.log(error);
					setStore({...store, isLoadingPlanets: false})
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
					if ((store.favourites[i].uid == uid) && (store.favourites[i].type == typeOfItem)) return;
				}
				setStore({ 
					...store, 
					favourites: [...store.favourites, { "key": name, "name": name, "type": typeOfItem ,"uid": uid }]
				})
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
