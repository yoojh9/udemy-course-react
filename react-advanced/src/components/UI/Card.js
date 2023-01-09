import styles from './Card.module.css';

const Card = (props) => {
  // <Card></Card> 태그 안에 있는 태그들을 children으로 받을 수 있음
  return <div className={`${styles.card} ${props.className}`}>{props.children}</div>;
}

export default Card;