import styles from './styles.module.css';

interface CardRootProps {
	children: React.ReactNode;
}

export function CardRoot({ children }: CardRootProps) {
	return <div className={styles.card}>{children}</div>;
}
