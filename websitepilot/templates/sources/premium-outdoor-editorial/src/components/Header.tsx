const navItems = ["Work", "Services", "Process", "Consult"];

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="Outdoor design build template home">
        <span className="brand-symbol" aria-hidden="true" />
        <span>
          <strong>Terra & Stone</strong>
          <small>Outdoor Design Build</small>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href={`#${item.toLowerCase()}`} key={item}>
            {item}
          </a>
        ))}
      </nav>
      <a className="button button--dark" href="#consult">
        Start a Project
      </a>
    </header>
  );
}
