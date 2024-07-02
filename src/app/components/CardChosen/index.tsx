import { Boardgame } from '../../interfaces';
import { Card } from '../Card';

interface CardChosenProps {
	boardgame: Boardgame;
}

export function CardChosen({ boardgame }: CardChosenProps) {
	return (
		<Card.Root>
			<Card.Header>
				<Card.HeaderTitle name={boardgame.name} />
			</Card.Header>
			<Card.Image image={boardgame.image} name={boardgame.name} />
			<Card.Description boardgame={boardgame} />
		</Card.Root>
	);
}
