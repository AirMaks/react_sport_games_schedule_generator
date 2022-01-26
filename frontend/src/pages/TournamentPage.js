import { Fragment, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Context } from "../index";
// import { fetchGames } from "../http/gamesAPI";
import { fetchOneTournament, fetchGames } from "../http/tournamentsAPI";

const TournamentPage = () => {

    const [tournament, setTournament] = useState([])
    // const games = useContext(Context)
    const [games, setGames] = useState([])
    const {id} = useParams()

//    console.log(games.games);

    useEffect(() => {
        fetchOneTournament(id).then(data => setTournament(data))
        fetchGames(id).then(data => setGames(data))
    }, [])

    
    // console.log(games);

    return (
        
        <Container>
            <h1 className="mt-5 mb-5">{tournament.title}</h1>
            <Tabs forceRenderTabPanel defaultIndex={0}>
                
                <TabList>
                    <Tab>Таблица</Tab>
                    <Tab>Расписание</Tab>
                    <Tab>Статистика</Tab>
                </TabList>
                <TabPanel>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Команда</th>
                                <th scope="col">Игры</th>
                                <th scope="col">В-Н-П</th>
                                <th scope="col">Разница</th>
                                <th scope="col">Очки</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Real</td>
                                <td>30</td>
                                <td>20-2-0</td>
                                <td>100 - 20 <sup>+20</sup></td>
                                <td>42</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>MU</td>
                                <td>30</td>
                                <td>20-2-0</td>
                                <td>100 - 20 <sup>+20</sup></td>
                                <td>42</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td >Barcelona</td>
                                <td >30</td>
                                <td>20-2-0</td>
                                <td>100 - 20 <sup>+20</sup></td>
                                <td>42</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </TabPanel>
                <TabPanel>
                    <div className="d-flex">
                    {
                        [...games].map((el, i) => {
                            console.log(i);
                            return (
                                <Fragment key={`key_${i}`}>
                                <div className="d-inline-block mb-4" id={`${el.team_home}`}
                                 key={`${el.team_home}`}
                                 >{el.team_home}</div>
                                <div className="d-inline-block mb-4 ms-3" id={`${el.team_away}`}  
                                key={`${el.team_away}`}
                                >{el.team_away}</div><br/>
                                </Fragment>
                            )
                        })
                    }
                    </div>
                </TabPanel>
                
                <TabPanel>
                    <Tabs forceRenderTabPanel>
                        <TabList>
                            <Tab>Бомбардиры</Tab>
                            <Tab>Ассистенты</Tab>
                            <Tab>Гол + пас</Tab>
                            <Tab>ЖК</Tab>
                            <Tab>КК</Tab>
                        </TabList>
                        <TabPanel>
                            <p>Protagonist, from the 20th Century. Delivery boy. Many times great-uncle to Professor Hubert Farnsworth. Suitor of Leela.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png" alt="Philip J. Fry" />
                        </TabPanel>
                        <TabPanel>
                            <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
                        </TabPanel>
                        <TabPanel>
                            <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
                        </TabPanel>
                        <TabPanel>
                            <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
                        </TabPanel>
                        <TabPanel>
                            <p>Mutant cyclops. Captain of the Planet Express Ship. Love interest of Fry.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png" alt="Turanga Leela" />
                        </TabPanel>
                        
                    </Tabs>
                </TabPanel>
            </Tabs>
        </Container>
    )
}

export default TournamentPage;
