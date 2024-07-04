'use client';
import { useRef, useState } from 'react';
import { Boardgame } from './interfaces';
import { boardgames } from './data';
import { CardAvailable, CardChosen, CardUnavailable } from './components';
import { FaArrowCircleUp, FaArrowDown } from 'react-icons/fa';

import styles from './page.module.css';
import './styles.css';
import { AvailableGames, UnavailableGames } from './sections';

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
		const unavailableGamesRef = document.getElementById('unavailable-games');
		if (unavailableGamesRef) {
			unavailableGamesRef.scrollIntoView({
				behavior: 'smooth',
			});
		}
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
					<a className={styles.header__link} onClick={scrollToUnavailableGames}>
						Ver jogos indisponíveis <FaArrowDown />
					</a>
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

			<AvailableGames
				availableGames={availableGames}
				unavailableGames={unavailableGames}
				setAvailableGames={setAvailableGames}
				setUnavailableGames={setUnavailableGames}
			/>

			<UnavailableGames
				id='unavailable-games'
				availableGames={availableGames}
				unavailableGames={unavailableGames}
				setAvailableGames={setAvailableGames}
				setUnavailableGames={setUnavailableGames}
			/>
		</div>
	);
}
