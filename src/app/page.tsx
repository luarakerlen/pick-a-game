'use client';
import { useRef, useState } from 'react';
import { Boardgame } from './interfaces';
import { boardgames } from './data';
import './styles.css';

import styles from './page.module.css';
import { CardAvailable, CardChosen, CardUnavailable } from './components';
import { FaArrowCircleUp, FaArrowDown } from 'react-icons/fa';

export default function Home() {
	const SCROLL_THRESHOLD = 250;
	const unavailableGamesRef = useRef<HTMLDivElement | null>(null);

	const [randomGame, setRandomGame] = useState<Boardgame | null>(null);
	const [availableGames, setAvailableGames] = useState<Boardgame[]>(boardgames);
	const [unavailableGames, setUnavailableGames] = useState<Boardgame[]>([]);
	const [visible, setVisible] = useState(false);

	const hasUnavailableGames = unavailableGames.length > 0;

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

	function toggleVisible() {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > SCROLL_THRESHOLD) {
			setVisible(true);
		} else if (scrolled <= SCROLL_THRESHOLD) {
			setVisible(false);
		}
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	window.addEventListener('scroll', toggleVisible);

	function scrollToUnavailableGames() {
		unavailableGamesRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}

	return (
		<div className={styles.container}>
			<button
				className={styles.arrow__up__button}
				onClick={scrollToTop}
				style={{ display: visible ? 'inline' : 'none' }}
			>
				<FaArrowCircleUp size={40} />
			</button>

			{hasUnavailableGames && (
				<div className={styles.header}>
					<ul>
						<li>
							<a
								className={styles.header__link}
								onClick={scrollToUnavailableGames}
							>
								Ver jogos indisponíveis <FaArrowDown />
							</a>
						</li>
					</ul>
				</div>
			)}

			<button className={styles.button} onClick={chooseRandomGame}>
				Escolher um jogo aleatoriamente
			</button>

			{randomGame && (
				<div className={styles.chosen}>
					<h1 className={styles.chosenTitle}>Jogo escolhido</h1>
					<CardChosen boardgame={randomGame} />
				</div>
			)}

			<div id='available-boardgames' className={styles.available}>
				<h1 className={styles.sectionTitle}>
					Jogos disponíveis ({availableGames.length}):
				</h1>
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

			{hasUnavailableGames && (
				<div
					ref={unavailableGamesRef}
					id='unavailable-boardgames'
					className={styles.available}
				>
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
