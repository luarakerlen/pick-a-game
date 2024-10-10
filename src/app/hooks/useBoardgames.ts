import { useEffect, useState } from 'react';
import { Boardgame } from '../interfaces';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../../../configuration';
import Swal from 'sweetalert2';
import '../styles.css';
// import { boardgames } from '../data';

export function useBoardgames() {
	const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
	const [availableGames, setAvailableGames] = useState<Boardgame[]>(boardgames);
	const [unavailableGames, setUnavailableGames] = useState<Boardgame[]>([]);
	const [randomGame, setRandomGame] = useState<Boardgame | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	function onOpen() {
		setIsOpen(true);
	}

	function onClose() {
		setIsOpen(false);
	}

	function setAvailableGamesOrdered(availableGames: Boardgame[]) {
		setAvailableGames(
			[...availableGames].sort((a, b) => a.name.localeCompare(b.name))
		);
	}

	function setUnavailableGamesOrdered(unavailableGames: Boardgame[]) {
		setUnavailableGames(
			[...unavailableGames].sort((a, b) => a.name.localeCompare(b.name))
		);
	}

	const addGame = async (newGame: Boardgame) => {
		if (
			boardgames.some(
				(game) =>
					game.name.toLocaleLowerCase() === newGame.name.toLocaleLowerCase()
			)
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Esse jogo já está cadastrado!',
			});
		} else {
			await addDoc(collection(db, 'games'), newGame);
			setBoardgames([newGame, ...boardgames]);
			setAvailableGamesOrdered([newGame, ...availableGames]);

			Swal.fire({
				icon: 'success',
				title: 'Jogo cadastrado com sucesso!',
				showConfirmButton: false,
				timer: 2000,
			});
		}
	};

	function handleAddGame(form: HTMLFormElement) {
		const name = form.querySelector('#name') as HTMLInputElement;
		const minPlayers = form.querySelector('#minPlayers') as HTMLInputElement;
		const maxPlayers = form.querySelector('#maxPlayers') as HTMLInputElement;
		const image = form.querySelector('#image') as HTMLInputElement;

		if (
			name.value.trim() === '' ||
			minPlayers.value.trim() === '' ||
			maxPlayers.value.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha todos os campos obrigatórios!',
				customClass: {
					container: 'swal2-container-add-game',
				}
			});
			return;
		}

		const newGame = {
			name: name.value,
			minPlayers: Number(minPlayers.value),
			maxPlayers: Number(maxPlayers.value),
			image: image.value,
		};

		addGame(newGame);
		onClose();
	}

	useEffect(() => {
		const fetchData = async () => {
			const querySnapshot = await getDocs(collection(db, 'games'));
			const gamesData: Boardgame[] = querySnapshot.docs.map(
				(doc) => doc.data() as Boardgame
			);

			setBoardgames(gamesData);
			setAvailableGamesOrdered(gamesData);
		};

		fetchData();
	}, []);

	return {
		boardgames,
		availableGames,
		setAvailableGamesOrdered,
		unavailableGames,
		setUnavailableGamesOrdered,
		randomGame,
		setRandomGame,
		handleAddGame,
		isOpen,
		onOpen,
		onClose,
	};
}
