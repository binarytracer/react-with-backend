export default function Error(props) {
  return (
    <section className="error">
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
}
