'use client';
import { useEffect, useState } from 'react';
import { FaArrowCircleUp, FaPlusCircle } from 'react-icons/fa';
import {
	AvailableGames,
	ChosenGame,
	Header,
	UnavailableGames,
} from './sections';

import styles from './page.module.css';
import './styles.css';
import { useBoardgames } from './hooks';
import { Modal } from './components';

export default function Home() {
	const SCROLL_THRESHOLD = 250;

	const {
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
	} = useBoardgames();

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

			<button className={styles.plus__button} onClick={onOpen}>
				<FaPlusCircle size={40} />
			</button>

			<Modal open={isOpen} onClose={onClose} onConfirm={handleAddGame} />

			<Header
				availableGames={availableGames}
				unavailableGames={unavailableGames}
				setRandomGame={setRandomGame}
				setAvailableGames={setAvailableGamesOrdered}
				setUnavailableGames={setUnavailableGamesOrdered}
			/>

			{randomGame && <ChosenGame randomGame={randomGame} />}

			<AvailableGames
				availableGames={availableGames}
				unavailableGames={unavailableGames}
				setAvailableGames={setAvailableGamesOrdered}
				setUnavailableGames={setUnavailableGamesOrdered}
			/>

			<UnavailableGames
				id='unavailable-games'
				availableGames={availableGames}
				unavailableGames={unavailableGames}
				setAvailableGames={setAvailableGamesOrdered}
				setUnavailableGames={setUnavailableGamesOrdered}
			/>
		</div>
	);
}
