import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	FormControl,
	useMediaQuery,
	InputLabel,
	Input,
} from '@mui/material';

interface ModalProps {
	open: boolean;
	onClose: () => void;
}

export function Modal({ open, onClose }: ModalProps) {
	const fullScreen = useMediaQuery('(max-width: 600px)');

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='xs'
			fullScreen={fullScreen}
		>
			<DialogTitle>Cadastrar novo jogo</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Preencha com as informações do jogo que deseja adicionar.
				</DialogContentText>

				<Box
					component='form'
					noValidate
					autoComplete='off'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					<FormControl sx={{ mt: 2 }}>
						<InputLabel htmlFor='name' required>Nome do jogo</InputLabel>
						<Input id='name' type='text' />
					</FormControl>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							gap: 2,
						}}
					>
						<FormControl sx={{ width: '100%'}}>
							<InputLabel htmlFor='minPlayers' required>Mínimo de jogadores</InputLabel>
							<Input id='minPlayers' type='number' />
						</FormControl>
						<FormControl sx={{ width: '100%'}}>
							<InputLabel htmlFor='maxPlayers' required>Máximo de jogadores</InputLabel>
							<Input id='maxPlayers' type='number' />
						</FormControl>
					</Box>
					<FormControl sx={{ mt: 2 }}>
						<InputLabel htmlFor='image'>Link da imagem</InputLabel>
						<Input id='image' type='text' />
					</FormControl>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
