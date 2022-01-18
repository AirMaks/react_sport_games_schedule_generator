import { 
    ADMIN_ROUTE, 
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, 
    TOURNAMENTS_ROUTE, 
    MENU_ROUTE,
    TURNIR_ROUTE,
    KRUG_ROUTE,
    SETKA_ROUTE

 } from "./utils/constants";

 import Menu from './components/Menu';
 import Setka from './pages/Setka';
 import Turnir from './pages/Turnir';
 import Auth from './pages/Auth';
 import Krug from './pages/Krug';
 import TournamentsPage from './pages/TournamentsPage';
 import Admin from './pages/Admin';
 import TournamentPage from './pages/TournamentPage';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: TOURNAMENTS_ROUTE + '/:id',
        Component: TournamentPage
    },
    {
        path: TOURNAMENTS_ROUTE,
        Component: TournamentsPage
    },
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    
];



export const publicRoutes = [
    
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    {
        path: KRUG_ROUTE,
        Component: Krug
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: TURNIR_ROUTE,
        Component: Turnir
    },
    {
        path: SETKA_ROUTE,
        Component: Setka
    }
];

