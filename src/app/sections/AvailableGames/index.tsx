import styles from '../sections.module.css';
import { CardAvailable } from '../../components';
import { Boardgame } from '../../interfaces';

interface AvailableGamesProps {
	availableGames: Boardgame[];
	unavailableGames: Boardgame[];
	setAvailableGames: (value: Boardgame[]) => void;
	setUnavailableGames: (value: Boardgame[]) => void;
}

export function AvailableGames({
	availableGames,
	unavailableGames,
	setAvailableGames,
	setUnavailableGames,
}: AvailableGamesProps) {
	function handleAvailableClick(boardgame: Boardgame) {
		setAvailableGames(
			availableGames.filter((game) => game.name !== boardgame.name)
		);
		setUnavailableGames([...unavailableGames, boardgame]);
	}

	return (
		<div id='available-boardgames' className={styles.container}>
			<h1 className={styles.title}>
				Jogos disponíveis ({availableGames.length}):
			</h1>
			<ul className={styles.list}>
				{availableGames.map((game) => (
					<CardAvailable
						key={game.name}
						boardgame={game}
						onClick={() => handleAvailableClick(game)}
					/>
				))}
			</ul>
		</div>
	);
}
