import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { GrPowerReset } from 'react-icons/gr';
import { Boardgame } from '../../interfaces';
import styles from './styles.module.css';

interface HeaderProps {
	availableGames: Boardgame[];
	unavailableGames: Boardgame[];
	setRandomGame: (value: Boardgame | null) => void;
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
	const playersNumber = Array.from({ length: 10 }, (_, i) => i + 1);
	const [chosenPlayersNumber, setChosenPlayersNumber] = useState<number | null>(
		null
	);

	const allGames = availableGames.concat(unavailableGames);
	const hasUnavailableGames = unavailableGames.length > 0;
	const shouldShowHeaderButtons = hasUnavailableGames || chosenPlayersNumber;

	function scrollToUnavailableGames() {
		const unavailableGamesRef = document.getElementById('unavailable-games');
		if (unavailableGamesRef) {
			unavailableGamesRef.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}

	function handleReset() {
		setChosenPlayersNumber(null);
		setAvailableGames(allGames);
		setUnavailableGames([]);
		setRandomGame(null);
	}

	function handlePlayersNumber(playersNumber: number) {
		setChosenPlayersNumber(playersNumber);

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
				className={styles.headerButtons}
				style={{
					display: shouldShowHeaderButtons ? 'flex' : 'none',
				}}
			>
				<button
					onClick={scrollToUnavailableGames}
					style={{
						display: hasUnavailableGames ? 'flex' : 'none',
					}}
				>
					Ver jogos indisponíveis <FaArrowDown />
				</button>
				<button
					onClick={handleReset}
					style={{
						display: shouldShowHeaderButtons ? 'flex' : 'none',
					}}
				>
					Resetar <GrPowerReset />
				</button>
			</div>

			<div className={styles.playersNumber}>
				<h4>Quantas pessoas vão jogar?</h4>
				<ul>
					{playersNumber.map((number) => (
						<li key={number}>
							<button
								className={number === chosenPlayersNumber ? styles.active : ''}
								onClick={() => handlePlayersNumber(number)}
							>
								{number}
							</button>
						</li>
					))}
				</ul>
			</div>

			<button
				className={styles.mainButton}
				onClick={chooseRandomGame}
				disabled={!chosenPlayersNumber}
			>
				Escolher um jogo aleatoriamente
				<p
					style={{
						display: chosenPlayersNumber ? 'none' : 'block',
					}}
				>
					(escolha a quantidade de jogadores primeiro)
				</p>
			</button>
		</>
	);
}
