import { CardAvailable } from '../../components';
import { Boardgame } from '../../interfaces';
import { ListSection } from '../ListSection';

interface AvailableGamesProps extends React.HTMLAttributes<HTMLDivElement> {
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
	...rest
}: AvailableGamesProps) {
	function handleAvailableClick(boardgame: Boardgame) {
		setAvailableGames(
			availableGames.filter((game) => game.name !== boardgame.name)
		);
		setUnavailableGames([...unavailableGames, boardgame]);
	}

	return (
		<ListSection
			{...rest}
			title={`Jogos disponíveis (${availableGames.length})`}
			games={availableGames}
			handleClick={handleAvailableClick}
			Card={CardAvailable}
		/>
	);
}
