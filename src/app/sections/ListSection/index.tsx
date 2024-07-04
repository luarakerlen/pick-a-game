import styles from './styles.module.css';
import { Boardgame } from '../../interfaces';

interface ListSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	games: Boardgame[];
	handleClick: (game: Boardgame) => void;
	Card: React.FC<{ boardgame: Boardgame; onClick: () => void }>;
}

export function ListSection({
	title,
	games,
	handleClick,
	Card,
	...rest
}: ListSectionProps) {
	return (
		<div {...rest} className={styles.container}>
			<h1 className={styles.title}>{title}:</h1>
			<ul className={styles.list}>
				{games.map((game) => (
					<Card
						key={game.name}
						boardgame={game}
						onClick={() => handleClick(game)}
					/>
				))}
			</ul>
		</div>
	);
}
