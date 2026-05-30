import './PostIt.scss'

const PostIt = ({ title, items, color = "yellow", rotate = "2.5deg" }) => {
  return (
    <div
      className={`post-it-note theme-${color}`}
      style={{ "--postit-rotate": rotate }}
    >
      {title && <h4 className="note-title">{title}</h4>}
      <ul className="note-list">
        {items.map((item, index) => (
          <li key={index}>
            <input type="checkbox" defaultChecked readOnly />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostIt;
