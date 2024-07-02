'use client';
import { useState } from 'react';
import { Boardgame } from './interfaces';
import { boardgames } from './data';
import './styles.css';

import styles from './page.module.css';
import { CardAvailable, CardChosen, CardUnavailable } from './components';

export default function Home() {
	const [randomGame, setRandomGame] = useState<Boardgame | null>(null);
	const [availableGames, setAvailableGames] = useState<Boardgame[]>(boardgames);
	const [unavailableGames, setUnavailableGames] = useState<Boardgame[]>([]);

	function chooseRandomGame() {
		const randomIndex = Math.floor(Math.random() * availableGames.length);
		setRandomGame(availableGames[randomIndex]);
	}

	function handleAvailableClick(boardgame: Boardgame) {
		setAvailableGames(
			availableGames.filter((game) => game.name !== boardgame.name)
		);
		setUnavailableGames([...unavailableGames, boardgame]);
	}

	function handleUnavailableClick(boardgame: Boardgame) {
		setAvailableGames([...availableGames, boardgame]);
		setUnavailableGames(
			unavailableGames.filter((game) => game.name !== boardgame.name)
		);
	}

	return (
		<div className={styles.container}>
			<button className={styles.button} onClick={chooseRandomGame}>
				Escolher um jogo aleatoriamente
			</button>

			{randomGame && (
				<div className={styles.chosen}>
					<h1 className={styles.chosenTitle}>Jogo escolhido</h1>
					<CardChosen boardgame={randomGame} />
				</div>
			)}

			<div className={styles.available}>
				<h1 className={styles.sectionTitle}>Jogos disponíveis ({availableGames.length}):</h1>
				<ul className={styles.availableList}>
					{availableGames.map((game) => (
						<CardAvailable
							key={game.name}
							boardgame={game}
							onClick={() => handleAvailableClick(game)}
						/>
					))}
				</ul>
			</div>

			{unavailableGames.length > 0 && (
				<div className={styles.available}>
					<h1 className={styles.sectionTitle}>
						Jogos que não devem ser escolhidos ({unavailableGames.length}):
					</h1>
					<ul className={styles.availableList}>
						{unavailableGames.map((game) => (
							<CardUnavailable
								key={game.name}
								boardgame={game}
								onClick={() => handleUnavailableClick(game)}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
