import { useState, useRef, useContext, useEffect, Fragment} from "react";
import {shuffle, transliterate} from '../helpers';
import TeamItem from "../components/TeamItem.js";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import {isMobile} from 'react-device-detect';
import Lightbox from "react-image-lightbox";
import { Context } from "../index";
import { createTeam, fetchTeams, removeAllTeams, removeTeam } from "../http/teamsAPI";
import Button from 'react-bootstrap/Button'
import { observer } from "mobx-react-lite";
import { createGame, fetchGames } from "../http/gamesAPI";
import { createTournament } from "../http/tournamentsAPI";

const Krug = () => {

    const [numOfRound, setNumOfRound] = useState('');
    const [name, setName] = useState('')
    const {teams} = useContext(Context);
    const [teamsLen, setTeamsLen] = useState(0);
    const [schedule, setSchedule] = useState([]);
    const [shuffleTeams, setShuffleTeams] = useState(false);
    
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const savePDFBtnRef = useRef(null);
    const saveTournamentBtnRef = useRef(null);
    const scheduleItems = useRef(null);
    const useChromeRef = useRef(null);

    const images = [
        "img/1.PNG",
        "img/2.PNG",
        "img/3.PNG",
        "img/4.PNG",
        "img/5.PNG",
        "img/6.PNG"
    ];
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const SKIP_TOUR = 'Пропускает:';
    
 
    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);

    const refreshTeams = async () => {
        await fetchTeams().then(data => {
            teams.setTeams([...data]);
            setTeamsLen(data.length);
        })
    }

    useEffect(() => {
        refreshTeams();
    }, []);

    

    const handleExportWithComponent = (event) => {
        savePDF(contentArea.current, {allPages: true,paperSize: "A4", scale: 0.8, margin: { top: "0.5m", left: "2cm", right: "1cm", bottom: "2cm"}})
    }
    
    const addTeam = () => {
        inputRef.current.focus();

        if (name.trim() !== '') {
        
            const found = teams.teams.some(el => el.name.toLowerCase().trim() === name.toLowerCase().trim().split(/\s+/).join(' '));
            setName('');
            if (found) {
                setName(name.trim().split(/\s+/).join(' '));
                alert('Команда с таким названием уже существует.');
                return false;
            }

            createTeam({
                'name': name
            }).then(refreshTeams)
            inputRef.current.style.borderColor = "#ccc";
            
        } else {
            setName('');
            
            inputRef.current.style.borderColor = "#c00";
            return false;
        }
     
    }

    const deleteTeam = (id) => {
        removeTeam(id).then(refreshTeams)
    }


    const handleChange = e => {
        inputRef.current.style.borderColor = "#ccc";
        setName(e.target.value)
    }

    const handleRoundChange = e => {

        inputRef2.current.style.borderColor = "#ccc";
        if (e.target.value !== "") {
            setNumOfRound(+e.target.value);
        } else {
            setNumOfRound("");
        }
        
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (name.trim() !== '') {
                addTeam();
                inputRef.current.style.borderColor = "#ccc";
            } else {
                setName('');
                inputRef.current.style.borderColor = "#c00";
            }
        }
    }

    const clear = () => {
        removeAllTeams().then(refreshTeams)
    }

    const clearColors = () => {
        let missItems = document.querySelectorAll('.schedule .schedule-item.miss');
        let pairItems = document.querySelectorAll('.schedule .schedule-item.pair');
        [...missItems].map(el => {

           
            [...el.childNodes].map(item => {

                item.style.backgroundColor = "#ccc";
               
                
                return true;
            })
            return true;
        });

        [...pairItems].map(el => {

           
            [...el.childNodes].map(item => {

                item.style.backgroundColor = "#fff";
               
                
                return true;
            })
            return true;
        });
    }

    const clearColor = (e) => {
        let allItems = document.querySelectorAll('.schedule .schedule-item');
        [...allItems].map(el => { 
   
            [...el.childNodes].map(item => {
                
                if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.previousSibling && !item.previousSibling.classList.contains('propuskaet')) {
                    item.style.backgroundColor = '#fff';
                } else if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.previousSibling && item.previousSibling.classList.contains('propuskaet')) {
                    item.style.backgroundColor = '#ccc';
                }

                if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.nextSibling && !item.nextSibling.classList.contains('propuskaet')) {
                    item.style.backgroundColor = '#fff';
                } else if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.nextSibling && item.nextSibling.classList.contains('propuskaet')) {
                    item.style.backgroundColor = '#ccc';
                }

                if(e.target.parentNode.classList.contains('propuskaet') && item.className === e.target.parentNode.className) {
                    item.style.backgroundColor = '#ccc';
                } 

                return true;
            })
            return true;
        });
    }

    const colorTeamOnClick = (e) => {
        
        let allItems = document.querySelectorAll('.schedule .schedule-item');
        let targetClassName = e.target.className;
        var randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
        [...allItems].map(el => { 
   
            [...el.childNodes].map(item => {
                
                if (item.className === targetClassName && item.tagName === 'DIV') {
                    item.style.backgroundColor = randomColor;
                }

                return true;
            })

            return true;
        });
    }

    const switchTeams = e => {
        [e.target.parentNode.children[0].children[0].textContent, e.target.parentNode.children[2].children[0].textContent] = [e.target.parentNode.children[2].children[0].textContent, e.target.parentNode.children[0].children[0].textContent];
        [e.target.parentNode.children[0].className, e.target.parentNode.children[2].className] = [e.target.parentNode.children[2].className, e.target.parentNode.children[0].className];
        [e.target.parentNode.children[0].style.backgroundColor, e.target.parentNode.children[2].style.backgroundColor] = [e.target.parentNode.children[2].style.backgroundColor, e.target.parentNode.children[0].style.backgroundColor];
    }

    const scheduler = () => { 
      
        if (numOfRound !== 1 && numOfRound !== 2 && numOfRound !== 3 && numOfRound !== 4) {
            inputRef2.current.style.borderColor = "#c00";
            return false
        } 

        if (savePDFBtnRef.current) {
            savePDFBtnRef.current.classList.remove('disabled');
        }

        if (saveTournamentBtnRef.current) {
            saveTournamentBtnRef.current.classList.remove('disabled');
        }

        if (useChromeRef.current) {
            useChromeRef.current.classList.remove('hidden');
        }
        
        clearColors();
        if (shuffleTeams) shuffle(teams.teams); 
        // console.log(teams.teams);

        // teams.teams.map(team => console.log(team))
        const tempo = teams.teams.slice();

        if (tempo.length % 2 !== 0) tempo.unshift({ name: SKIP_TOUR}); 

            
        const away = tempo.splice(tempo.length / 2);
        const home = tempo;
        const round = [];
        const tour = [];
        let pop = [];
        let tourNum = teams.teams.length / 2;
        let tn = 1;

        for (let n = 0; n < numOfRound; n++) {

            for (let i = 0; i < home.length + away.length - 1; i++) {
                    
                for (let j = 0; j < home.length; j++) {
                        if (n % 2 === 0) {

                            if (home[j]['name'] !== SKIP_TOUR) {
                                if (i % 2 === 0) {
                                    round.push({
                                        home: home[j]['name'],
                                        away: away[j]['name'],
                                        tour: j % tourNum === 0 && tn,
                                        id: tn,
                                        
                                    });
                                } else {
                                    round.push({
                                        home: away[j]['name'],
                                        away: home[j]['name'],
                                        tour: j % tourNum === 0 && tn,
                                        id: tn,
                                        
                                    });
                                }
                               	
                            } else {
                                round.push({
                                    home: home[j]['name'],
                                    away: away[j]['name'],
                                    tour: j % tourNum === 0 && tn,
                                    id: tn,
                                    
                                });
                            }
                        } else {
    
                            if (home[j]['name'] === SKIP_TOUR) {
                                
                                    round.push({
                                        home: home[j]['name'],
                                        away: away[j]['name'],
                                        tour: j % tourNum === 0 && tn,
                                        id: tn
                                    });	
                            } else {
                                if (i % 2 === 0) {
                                    round.push({
                                        home: away[j]['name'],
                                        away: home[j]['name'],
                                        tour: j % tourNum === 0 && tn,
                                        id: tn
                                    });	
                                } else {
                                    round.push({
                                        home: home[j]['name'],
                                        away: away[j]['name'],
                                        tour: j % tourNum === 0 && tn,
                                        id: tn
                                    });	
                                }
                            }
                            
                        }
                    
                    
                    
                }    	
                    
                tn++;
                    
                
                if (home.length + away.length - 1 > 2) {
                    const splicedHomeTeam = home.splice(1, 1);
                    const splicedHomeTeamShifted = splicedHomeTeam.shift();
                    const poppedAwayTeam = away.pop();
                    away.unshift(splicedHomeTeamShifted);
                    home.push(poppedAwayTeam);
                }
               
            }

            
            pop = round.splice(0, round.length);
            tour.push(pop);
            pop.splice();
            round.splice();
            

           
        }

        // this is for each team playing home and away equally  
        [...tour].map(el => {

            [...el].map((t, i) => {
                if (teams.length === 3) {
                    if (i === 3) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 4) {
                    if (i === 3) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 5) {
                    if (i === 2 || i === 14) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 6) {
                    if (i === 14) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 7) {
                    if (i === 1 || i === 7 ||  i === 23 || i === 25) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 8) {
                    if (i === 1 || i === 7) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 9) {
                    if (i === 3 || i === 9 ||  i === 19 ||  i === 36 || i === 42 ) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 10) {
                    if (i === 1 || i === 3 || i === 9) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 11) {
                    if ( i === 5 || i === 35 || i === 47 || i === 62  || i === 65) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 12) {
                    if (i === 1 || i === 3 || i === 5) {
                        [t.home, t.away] = [t.away, t.home];
                    }
                }

                if (teams.length === 13) {
                    // if ( i === 4 || i === 34 || i === 46 || i === 61  || i === 64) {
                    //     [t.home, t.away] = [t.away, t.home];
                    // }
                }
               
                
                return true;
            })
            return true;
        })
        
        setSchedule([...tour])
        setShuffleTeams(true);


       
    }

    // const saveGames = () => {
    //     [...schedule].map(obj => {
    //         [...Object.values(obj)].map((pair, index) => {
    //             createGame({
    //                 'team_home': pair.home,
    //                 'team_away': pair.away,
    //                 'team_home_score': '1',
    //                 'team_away_score': '0',
    //             })
    //         })
           
    //     })
    // }
    const {games} = useContext(Context)
    const saveTournament = () => {
        
        let result = prompt("Введите название турнира", "");
        createTournament({
            'title': result,
        }).then(data => {
            
            [...schedule].map((obj, i) => {
                [...Object.values(obj)].map((pair, index) => {
                    createGame({
                        'team_home': pair.home,
                        'team_away': pair.away,
                        'team_home_score': '',
                        'team_away_score': '',
                        'tournamentId': data.id,
                        'round': i
                    })
                })
               
            })
        })

    }

    // console.log(schedule);
    

    
    
      
    
    return (
        <>
        <h1 className="mt-5 mb-5">Создать турнир</h1>
        <div className="wrapper"> 
        { teamsLen > 0 &&
            <div>
                <ul className="teams-list">
                    { teams.teams.map((team, index) => {
                        return (
                        // <TeamItem teams={teams.teams} key={team.id} team={team} index={index} />
                        <li key={team.id}>
                            <span>{`${index + 1}.`}</span>
                            <div>{`${team.name}`}</div>
                            {teamsLen > 3 && <span className="remove-btn" onClick={() => deleteTeam(team.id)}></span>}
                        </li>
                    )})
}
                </ul>
            </div>
        }
            
            <div className="wrapper-container">
                <div className="container-3">
                    <div className="container-2">
                        <input ref={inputRef}  onKeyDown={handleKeyDown} type="text" placeholder="Enter the team name" onChange={e => handleChange(e)} value={name}/>
                        <Button className="btn-add" onClick={addTeam} >Add team</Button>
                    </div>
                    { teamsLen > 2 &&
                         <select required id="round" ref={inputRef2} onChange={e => handleRoundChange(e)} value={numOfRound === 0 || !numOfRound ? "" : numOfRound}>
                            <option defaultValue="" value="">Choose the number of rounds</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    }
                    
                    { teamsLen > 2 && <button className="generate-btn" onClick={() => scheduler()}>Генерировать расписание</button> }

                    { teamsLen > 0 && <button className="clear-btn" onClick={clear}>Очистить все</button> }
                    
                    { teamsLen > 2 &&
                           <div className="save-pdf-container">
                                <button ref={savePDFBtnRef} className="save-pdf disabled" onClick={handleExportWithComponent}>Сохранить PDF</button>
                                {
                                    isMobile && 
                                    <div ref={useChromeRef} className="use-chrome-container hidden">
                                    <div className="use-chrome">Use chrome browser and google drive to save PDF</div> 
                                    <button type="button" className="how-to-use" onClick={() => setIsOpen(true)}>How to use google drive?</button> 
                                    {isOpen && (
                                    <Lightbox
                                        enableZoom={false}
                                        mainSrc={images[photoIndex]}
                                        nextSrc={images[(photoIndex + 1) % images.length]}
                                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        onCloseRequest={() => setIsOpen(false)}
                                        onMovePrevRequest={() =>
                                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                                        }
                                        onMoveNextRequest={() =>
                                        setPhotoIndex( (photoIndex + 1) % images.length)
                                        }
                                    />
                                    )}
                                    </div>
                                    
                                }
                            </div>
                    }

                    { teamsLen > 2 && <button ref={saveTournamentBtnRef} className="save-tournament-btn mt-3 disabled" onClick={saveTournament}>Сохранить турнир</button> }


                    
                </div> 
                { schedule.length > 0 && (
                    <>
                    
                        <PDFExport ref={pdfExportComponent}>
                            
                            <div className="schedule mt-5" ref={contentArea}>
                            <h2>Schedule</h2> 
                            { schedule.map((obj, i) => (
                            <div className="round-wrapper mb-5" id={`round-round${i}`} key={`round-round${i}`}>
                                {[...Object.values(obj)].map((pair, index) => {

                                    console.log(index);
                                    return (
                                        <Fragment key={index}>
                                            {index === 0 && <div className="round mb-5" key={`round_${i}_${index}`}>{`${i + 1} круг`}</div>}
                                            {pair.tour && <div className="tour" key={`tour_${i}_${index}`}>{`${pair.tour} тур`}</div>}

                                            <div ref={scheduleItems} 
                                                className={pair.home === SKIP_TOUR ? 'schedule-item miss' : 'schedule-item pair'}  
                                                key={`${transliterate(pair.home)}_${index}_${pair.tour}`}
                                            >
                                                
                                                <div className={`${transliterate(pair.home)}`} 
                                                    //key={`${transliterate(pair.home)}_${Math.floor(Math.random() * (10000 - 2) + 2)}`} 
                                                    onClick={e => colorTeamOnClick(e)}
                                                >
                                                    <div 
                                                    //key={`${transliterate(pair.home)}_${pair.home.id}_${Math.floor(Math.random() * (10000 - 2) + 2)}`}
                                                    >{pair.home}</div>
                                                    <span 
                                                    //key={`${transliterate(pair.home)}_${pair.home.id}_${Math.floor(Math.random() * (10000 - 2) + 2)}`} 
                                                        className="color-box" onClick={e => clearColor(e)}></span>
                                                </div>
                                                {pair.home !== SKIP_TOUR && 
                                                    <span 
                                                    //key={`${pair.tour}_${Math.floor(Math.random() * (10000 - 2) + 2)}`} onClick={e => switchTeams(e)}
                                                    >
                                                        <svg 
                                                        //</span>key={`${pair.tour}_${Math.floor(Math.random() * (10000 - 2) + 2)}`} 
                                                        height="512" viewBox="0 0 512 512" width="512"><g><path d="m92.69 216c6.23 6.24 16.39 6.24 22.62 0l20.69-20.69c6.24-6.23 6.24-16.39 0-22.62l-20.69-20.69h284.69c26.47 0 48 21.53 48 48 0 13.23 10.77 24 24 24h16c13.23 0 24-10.77 24-24 0-61.76-50.24-112-112-112h-284.69l20.69-20.69c6.24-6.23 6.24-16.39 0-22.62l-20.69-20.69c-6.23-6.24-16.39-6.24-22.62 0l-90.35 90.34c-3.12 3.13-3.12 8.19 0 11.32z"/><path d="m419.31 296c-6.23-6.24-16.38-6.24-22.62 0l-20.69 20.69c-6.252 6.252-6.262 16.358 0 22.62l20.69 20.69h-284.69c-26.47 0-48-21.53-48-48 0-13.23-10.77-24-24-24h-16c-13.23 0-24 10.77-24 24 0 61.76 50.24 112 112 112h284.69l-20.69 20.69c-6.252 6.252-6.262 16.358 0 22.62l20.69 20.69c6.241 6.241 16.38 6.24 22.62 0l90.35-90.34c3.12-3.13 3.12-8.19 0-11.32z"/></g></svg>
                                                    </span>
                                                }
                                                    
                                                <div className={`${transliterate(pair.away)}`} 
                                                    //key={`${transliterate(pair.away)}_${Math.floor(Math.random() * (10000 - 2) + 2)}`} 
                                                    onClick={e => colorTeamOnClick(e)}>
                                                        <div 
                                                        //key={`${transliterate(pair.away)}_${pair.away.id}_${Math.floor(Math.random() * (10000 - 2) + 2)}`}
                                                        >{pair.away}</div> 
                                                        <span 
                                                        //key={`${transliterate(pair.away)}_${pair.away.id}_${Math.floor(Math.random() * (10000 - 2) + 2)}`} 
                                                              className="color-box" 
                                                              onClick={e => clearColor(e)}></span>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                }
                                )}
                            </div>
                            )) }
                            </div>

                            
                        </PDFExport>
                        
                    </>
                    ) 
                }
            
            </div>
            
        </div>
        </>
    )
    
}


export default Krug;