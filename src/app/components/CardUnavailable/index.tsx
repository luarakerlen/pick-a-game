import { Boardgame } from '../../interfaces';
import { Card } from '../Card';

interface CardUnavailableProps {
	boardgame: Boardgame;
	onClick: () => void;
}

export function CardUnavailable({ boardgame, onClick }: CardUnavailableProps) {
	return (
		<Card.Root>
			<Card.Header>
				<Card.HeaderTitle name={boardgame.name} />
				<Card.HeaderButton status='unavailable' onClick={onClick} />
			</Card.Header>
			<Card.Image image={boardgame.image} name={boardgame.name} />
			<Card.Description boardgame={boardgame} />
		</Card.Root>
	);
}
