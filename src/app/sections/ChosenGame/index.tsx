import { CardChosen } from '../../components';
import { Boardgame } from '../../interfaces';
import styles from './styles.module.css';

interface ChosenGameProps {
	randomGame: Boardgame;
}

export function ChosenGame({ randomGame }: ChosenGameProps) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Jogo escolhido</h1>
			<CardChosen boardgame={randomGame} />
		</div>
	);
}
