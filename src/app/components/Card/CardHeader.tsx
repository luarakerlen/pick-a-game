import styles from './styles.module.css';

interface CardHeaderProps {
	children: React.ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
	return <div className={styles.header}>{children}</div>;
}
