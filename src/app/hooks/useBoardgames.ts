import { useEffect, useState } from 'react';
import { Boardgame } from '../interfaces';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../../../configuration';
import Swal from 'sweetalert2';
// import { boardgames } from '../data';

export function useBoardgames() {
	const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
	const [availableGames, setAvailableGames] = useState<Boardgame[]>(boardgames);
	const [unavailableGames, setUnavailableGames] = useState<Boardgame[]>([]);
	const [randomGame, setRandomGame] = useState<Boardgame | null>(null);

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
		if (boardgames.some((game) => game.name === newGame.name)) {
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
		addGame,
	};
}
