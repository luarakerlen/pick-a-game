'use client';
import { useState } from 'react';
import { Boardgame } from './interfaces';
import { boardgames } from './data';
import './styles.css';

import styles from './page.module.css';
import { CardAvailable, CardChosen, CardUnavailable } from './components';

export default function Home() {
	const [randomGame, setRandomGame] = useState<Boardgame | null>(null);
	const [unavailableGames, setUnavailableGames] = useState<Boardgame[]>([
		{
			name: 'Catan',
			minPlayers: 3,
			maxPlayers: 4,
		},
	]);

	function chooseRandomGame() {
		const randomIndex = Math.floor(Math.random() * boardgames.length);
		setRandomGame(boardgames[randomIndex]);
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
				<h1>Jogos disponíveis ({boardgames.length}):</h1>
				<ul className={styles.availableList}>
					{boardgames.map((game) => (
						<CardAvailable key={game.name} boardgame={game} />
					))}
				</ul>
			</div>

			{unavailableGames.length > 0 && (
				<div className={styles.available}>
					<h1>
						Jogos que não devem ser escolhidos ({unavailableGames.length}):
					</h1>
					<ul className={styles.availableList}>
						{unavailableGames.map((game) => (
							<CardUnavailable key={game.name} boardgame={game} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
