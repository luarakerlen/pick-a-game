import { FaArrowDown } from 'react-icons/fa';
import { Boardgame } from '../../interfaces';
import styles from './styles.module.css';
import { useState } from 'react';

interface HeaderProps {
	availableGames: Boardgame[];
	unavailableGames: Boardgame[];
	setRandomGame: (value: Boardgame) => void;
	setAvailableGames: (value: Boardgame[]) => void;
	setUnavailableGames: (value: Boardgame[]) => void;
}

export function Header({
	availableGames,
	unavailableGames,
	setRandomGame,
	setAvailableGames,
	setUnavailableGames,
}: HeaderProps) {
	const allGames = availableGames.concat(unavailableGames);
	const hasUnavailableGames = unavailableGames.length > 0;
	const playersNumber = Array.from({ length: 10 }, (_, i) => i + 1);
	const [chosenNumber, setChosenNumber] = useState(0);

	function scrollToUnavailableGames() {
		const unavailableGamesRef = document.getElementById('unavailable-games');
		if (unavailableGamesRef) {
			unavailableGamesRef.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}

	function handlePlayersNumber(playersNumber: number) {
		setChosenNumber(playersNumber);

		const newAvailableGames = allGames.filter(
			(game) =>
				game.minPlayers <= playersNumber && game.maxPlayers >= playersNumber
		);
		setAvailableGames(newAvailableGames);

		const newUnavailableGames = allGames.filter(
			(game) =>
				game.minPlayers > playersNumber || game.maxPlayers < playersNumber
		);
		setUnavailableGames(newUnavailableGames);
	}

	function chooseRandomGame() {
		const randomIndex = Math.floor(Math.random() * availableGames.length);
		setRandomGame(availableGames[randomIndex]);
	}

	return (
		<>
			<div
				style={{
					display: hasUnavailableGames ? 'flex' : 'none',
				}}
				className={styles.unavailableGames__link__container}
			>
				<a
					className={styles.unavailableGames__link}
					onClick={scrollToUnavailableGames}
				>
					Ver jogos indisponíveis <FaArrowDown />
				</a>
			</div>

			<div className={styles.playersNumber}>
				<h4>Quantas pessoas vão jogar?</h4>
				<ul>
					{playersNumber.map((number) => (
						<li key={number}>
							<button
								className={number === chosenNumber ? styles.active : ''}
								onClick={() => handlePlayersNumber(number)}
							>
								{number}
							</button>
						</li>
					))}
				</ul>
			</div>

			<button className={styles.mainButton} onClick={chooseRandomGame}>
				Escolher um jogo aleatoriamente
			</button>
		</>
	);
}
