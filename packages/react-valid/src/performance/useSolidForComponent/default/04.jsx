let Component = (props) => <ol><For each={props.data}>{d => <li>{d.text}</li>}</For></ol>;
