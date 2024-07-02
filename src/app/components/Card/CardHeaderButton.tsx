import { Status } from '../../interfaces';
import styles from './styles.module.css';

import { CiTablets1 } from 'react-icons/ci';
import { MdBlockFlipped } from 'react-icons/md';

interface CardHeaderButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	status: Status;
}

export function CardHeaderButton({ status, ...rest }: CardHeaderButtonProps) {
	return (
		<button className={styles.button} {...rest}>
			{status === 'available' ? (
				<MdBlockFlipped className={styles.buttonIconAvailable} size={24} />
			) : (
				<CiTablets1 className={styles.buttonIconUnavailable} size={24} />
			)}
		</button>
	);
}
