import { FaArrowDown } from 'react-icons/fa';
import { Boardgame } from '../../interfaces';
import styles from './styles.module.css';

interface HeaderProps {
	availableGames: Boardgame[];
	unavailableGames: Boardgame[];
	setRandomGame: (value: Boardgame) => void;
}

export function Header({
	availableGames,
	unavailableGames,
	setRandomGame,
}: HeaderProps) {
	const hasUnavailableGames = unavailableGames.length > 0;

	function chooseRandomGame() {
		const randomIndex = Math.floor(Math.random() * availableGames.length);
		setRandomGame(availableGames[randomIndex]);
	}

	function scrollToUnavailableGames() {
		const unavailableGamesRef = document.getElementById('unavailable-games');
		if (unavailableGamesRef) {
			unavailableGamesRef.scrollIntoView({
				behavior: 'smooth',
			});
		}
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

			<button className={styles.button} onClick={chooseRandomGame}>
				Escolher um jogo aleatoriamente
			</button>
		</>
	);
}
