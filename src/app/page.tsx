'use client';
import { useState } from 'react';
import { BoardGame } from './interfaces';
import { boardgames } from './data';
import { Card } from './components';
import './styles.css';

import styles from './page.module.css';

export default function Home() {
	const [randomGame, setRandomGame] = useState<BoardGame | null>(null);

	function chooseRandomGame() {
		const randomIndex = Math.floor(Math.random() * boardgames.length);
		setRandomGame(boardgames[randomIndex]);
	}

	return (
		<div className={styles.container}>
			<button onClick={chooseRandomGame}>
				Escolher um jogo aleatoriamente
			</button>

			{randomGame && (
				<div className={styles.chosen}>
					<h1 className={styles.chosenTitle}>Jogo escolhido</h1>
					<Card boardgame={randomGame} />
				</div>
			)}

			<div className={styles.available}>
				<h1>Jogos disponíveis ({boardgames.length}):</h1>
				<ul className={styles.availableList}>
					{boardgames.map((game) => (
						<Card key={game.name} boardgame={game} />
					))}
				</ul>
			</div>
		</div>
	);
}
