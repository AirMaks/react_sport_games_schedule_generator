import {Link} from "react-router-dom";


const Menu = () => (
    <ul className="menu">
        <li><Link to="/krug">Круговой формат</Link></li>
        <li><Link to="/turnir">Групповой формат</Link></li>
        <li><Link to="/setka">Плэйофф</Link></li>
    </ul>
);
export default Menu;