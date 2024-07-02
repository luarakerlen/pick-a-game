import styles from './styles.module.css';

interface CardHeaderTitleProps {
	name: string;
}

export function CardHeaderTitle({ name }: CardHeaderTitleProps) {
	return <h2 className={styles.title}>{name}</h2>;
}
