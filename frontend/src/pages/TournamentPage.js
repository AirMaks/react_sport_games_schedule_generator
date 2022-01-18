import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { fetchOneTournament } from "../http/tournamentsAPI";

const TournamentPage = () => {

    const [tournament, setTournament] = useState([])
    const {id} = useParams()

    console.log(id);

    useEffect(() => {
        fetchOneTournament(id).then(data => setTournament(data))
    }, [])


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
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </TabPanel>
                <TabPanel />
                
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
