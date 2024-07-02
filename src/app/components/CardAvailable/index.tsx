import { Boardgame } from '../../interfaces';
import { Card } from '../Card';

interface CardAvailableProps {
	boardgame: Boardgame;
}

export function CardAvailable({ boardgame }: CardAvailableProps) {
	return (
		<Card.Root>
			<Card.Header>
				<Card.HeaderTitle name={boardgame.name} />
				<Card.HeaderButton status='available' />
			</Card.Header>
			<Card.Image image={boardgame.image} name={boardgame.name} />
			<Card.Description boardgame={boardgame} />
		</Card.Root>
	);
}
