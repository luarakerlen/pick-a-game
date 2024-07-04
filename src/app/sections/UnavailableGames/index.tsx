import { CardUnavailable } from '../../components';
import { Boardgame } from '../../interfaces';
import { ListSection } from '../ListSection';

interface UnavailableGamesProps extends React.HTMLAttributes<HTMLDivElement> {
	availableGames: Boardgame[];
	unavailableGames: Boardgame[];
	setAvailableGames: (value: Boardgame[]) => void;
	setUnavailableGames: (value: Boardgame[]) => void;
}

export function UnavailableGames({
	availableGames,
	unavailableGames,
	setAvailableGames,
	setUnavailableGames,
	...rest
}: UnavailableGamesProps) {
	const hasUnavailableGames = unavailableGames.length > 0;

	function handleUnavailableClick(boardgame: Boardgame) {
		setAvailableGames([...availableGames, boardgame]);
		setUnavailableGames(
			unavailableGames.filter((game) => game.name !== boardgame.name)
		);
	}

	return (
		<div style={{ display: hasUnavailableGames ? 'block' : 'none' }}>
			<ListSection
				{...rest}
				title={`Jogos que não podem ser escolhidos (${unavailableGames.length})`}
				games={unavailableGames}
				handleClick={handleUnavailableClick}
				Card={CardUnavailable}
			/>
		</div>
	);
}
