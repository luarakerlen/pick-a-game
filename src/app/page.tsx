'use client';
import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Boardgame } from './interfaces';
import { boardgames } from './data';
import {
	AvailableGames,
	ChosenGame,
	Header,
	UnavailableGames,
} from './sections';

import styles from './page.module.css';
import './styles.css';

export default function Home() {
	const SCROLL_THRESHOLD = 250;

	const [randomGame, setRandomGame] = useState<Boardgame | null>(null);
	const [availableGames, setAvailableGames] = useState<Boardgame[]>(boardgames);
	const [unavailableGames, setUnavailableGames] = useState<Boardgame[]>([]);
	const [visible, setVisible] = useState(false);

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

	useEffect(() => {
		window.addEventListener('scroll', toggleVisible);
	}, []);

	return (
		<div className={styles.container}>
			<button
				className={styles.arrow__up__button}
				onClick={scrollToTop}
				style={{ display: visible ? 'flex' : 'none' }}
			>
				<FaArrowCircleUp size={40} />
			</button>

			<Header
				availableGames={availableGames}
				unavailableGames={unavailableGames}
				setRandomGame={setRandomGame}
				setAvailableGames={setAvailableGames}
				setUnavailableGames={setUnavailableGames}
			/>

			{randomGame && <ChosenGame randomGame={randomGame} />}

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
