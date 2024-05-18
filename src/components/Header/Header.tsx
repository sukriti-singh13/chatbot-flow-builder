
import './Header.scss';
const Header = ({ saveFlow }: { saveFlow: () => void }) => {
  return (
    <header>
      <button onClick={saveFlow}>Save Changes</button>
    </header>
  );
};

export default Header;
