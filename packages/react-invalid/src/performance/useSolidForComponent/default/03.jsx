let Component = (props) => (
  <ol>
    {props.data.map((d) => (
      <li key={d.id}>{d.text}</li>
    ))}
  </ol>
);
