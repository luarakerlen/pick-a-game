import { Boardgame } from '../../interfaces';
import { Card } from '../Card';

interface CardAvailableProps {
	boardgame: Boardgame;
	onClick: () => void;
}

export function CardAvailable({ boardgame, onClick }: CardAvailableProps) {
	return (
		<Card.Root>
			<Card.Header>
				<Card.HeaderTitle name={boardgame.name} />
				<Card.HeaderButton status='available' onClick={onClick} />
			</Card.Header>
			<Card.Image image={boardgame.image} name={boardgame.name} />
			<Card.Description boardgame={boardgame} />
		</Card.Root>
	);
}
