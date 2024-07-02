import { Boardgame } from '../../interfaces';
import styles from './styles.module.css';

interface CardProps {
	boardgame: Boardgame;
}

export function CardDescription({ boardgame }: CardProps) {
	return (
		<p className={styles.description}>
			Jogadores: {boardgame.minPlayers} a {boardgame.maxPlayers}
		</p>
	);
}
