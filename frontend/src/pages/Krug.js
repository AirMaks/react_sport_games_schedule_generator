import { useState, useRef, useContext, useEffect} from "react";
import {shuffle, transliterate} from '../helpers';
import TeamItem from "../components/TeamItem.js";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import {isMobile} from 'react-device-detect';
import Lightbox from "react-image-lightbox";
import { Context } from "../index";
import { createTeam, fetchTeams, removeTeam } from "../http/teamsAPI";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { observer } from "mobx-react-lite";

const Krug = observer(() => {

    const [value, setValue] = useState('');
    const [numOfRound, setNumOfRound] = useState('');
    const [name, setName] = useState('')
    const {teams} = useContext(Context);
    const [teamsLen, setTeamsLen] = useState(0);
    
    useEffect(() => {
        fetchTeams().then(data => {
            
            teams.setTeams([...data]);
            setTeamsLen(data.length);
        })
    }, [teams.teams]);

    

    const [schedule, setSchedule] = useState([]);
    const [shuffleTeams, setShuffleTeams] = useState(false);
    
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const saveBtnRef = useRef(null);
    const scheduleItems = useRef(null);
    const useChromeRef = useRef(null);
    const TITLE = "Round - robin tournament schedule generator online";

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
    const SKIP_TOUR = 'Пропускает тур:';
    
 
    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);

    const handleExportWithComponent = (event) => {
        savePDF(contentArea.current, {paperSize: "A4", scale: 0.8, margin: { top: 20, left: 25, right: 0, bottom: 20}})
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
            })
            
        } else {
            setName('');
            
            inputRef.current.style.borderColor = "#c00";
            return false;
        }
     
    }

    const deleteTeam = (id) => {
        removeTeam(id)
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

    const clear = () => {
        setValue('');
        teams.setTeams([]);
        setSchedule([]);
        setShuffleTeams(false);
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
                
                if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.previousSibling && !item.previousSibling.classList.contains('propuskaet_tur')) {
                    item.style.backgroundColor = '#fff';
                } else if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.previousSibling && item.previousSibling.classList.contains('propuskaet_tur')) {
                    item.style.backgroundColor = '#ccc';
                }

                if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.nextSibling && !item.nextSibling.classList.contains('propuskaet_tur')) {
                    item.style.backgroundColor = '#fff';
                } else if (item.className === e.target.parentNode.className && item.tagName === 'DIV' && item.nextSibling && item.nextSibling.classList.contains('propuskaet_tur')) {
                    item.style.backgroundColor = '#ccc';
                }

                if(e.target.parentNode.classList.contains('propuskaet_tur') && item.className === e.target.parentNode.className) {
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

        if (saveBtnRef.current) {
            saveBtnRef.current.classList.remove('disabled');
        }

        if (useChromeRef.current) {
            useChromeRef.current.classList.remove('hidden');
        }
        
        clearColors();
        if (shuffleTeams) shuffle(teams.teams); 
        
        const tempo = teams.slice();
        if (tempo.length % 2 !== 0) tempo.unshift(SKIP_TOUR); 

        const away = tempo.splice(tempo.length / 2);
        const home = tempo;
        const round = [];
        const tour = [];
        let pop = [];
        let tourNum = teams.length / 2;
        let tn = 1;


        for (let n = 0; n < numOfRound; n++) {

            for (let i = 0; i < home.length + away.length - 1; i++) {
                    
                for (let j = 0; j < home.length; j++) {
                    
                        if (n % 2 === 0) {

                            if (home[j] !== 'Пропускает тур:') {
                                if (i % 2 === 0) {
                                    round.push({
                                        home: home[j],
                                        away: away[j],
                                        tour: j % tourNum === 0 ? tn : null,
                                        id: tn,
                                        
                                    });
                                } else {
                                    round.push({
                                        home: away[j],
                                        away: home[j],
                                        tour: j % tourNum === 0 ? tn : null,
                                        id: tn,
                                        
                                    });
                                }
                               	
                            } else {
                                round.push({
                                    home: home[j],
                                    away: away[j],
                                    tour: j % tourNum === 0 ? tn : null,
                                    id: tn,
                                    
                                });
                            }
                        } else {
    
                            if (home[j] === 'Пропускает тур:') {
                                
                                    round.push({
                                        home: home[j],
                                        away: away[j],
                                        tour: j % tourNum === 0 ? tn : null,
                                        id: tn
                                    });	
                            } else {
                                if (i % 2 === 0) {
                                    round.push({
                                        home: away[j],
                                        away: home[j],
                                        tour: j % tourNum === 0 ? tn : null,
                                        id: tn
                                    });	
                                } else {
                                    round.push({
                                        home: home[j],
                                        away: away[j],
                                        tour: j % tourNum === 0 ? tn : null,
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


    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (value.trim() !== '') {
                addTeam();
            } else {
                setValue('');
                inputRef.current.style.borderColor = "#c00";
            }
        }
    }
      
      
    

    return (
        <>
        <h1 className="mt-5 mb-5">{TITLE}</h1>
        <div className="wrapper"> 
        { teamsLen > 0 
            ? <div>
                <ul className="teams-list">
                    { teams.teams.map((team, index) => (
                        // <TeamItem teams={teams.teams} key={team.id} team={team} index={index} />
                        <li key={team.id}>
                            <span>{`${index + 1}.`}</span>
                            <div>{`${team.name}`}</div>
                            {teamsLen > 3 && <span className="remove-btn" onClick={() => deleteTeam(team.id)}></span>}
                        </li>
                    ))}
                </ul>
                </div>
            : null }
            
            <div className="wrapper-container">
                <div className="container-3">
                    <div className="container-2">
                    <input ref={inputRef}  type="text" placeholder="Enter the team name" onChange={e => setName(e.target.value)} value={name}/>
                    <Button className="btn-add" onClick={addTeam} >Add team</Button>
                    </div>
                    { teamsLen > 2 
                        ? <select required id="round" ref={inputRef2} onChange={e => handleRoundChange(e)} value={numOfRound === 0 || !numOfRound ? "" : numOfRound}>
                            <option defaultValue="" value="">Choose the number of rounds</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        : null }
                    
                    { teamsLen > 2 
                        ? <button className="generate-btn" onClick={() => scheduler()}>Generate schedule</button>
                        : null }

                    { teamsLen > 0 
                        ? <button className="clear-btn" onClick={clear}>Clear all</button>
                        : null }

                    { teamsLen > 2 
                        ?   <div className="save-pdf-container">
                                <button ref={saveBtnRef} className="save-pdf disabled" onClick={handleExportWithComponent}>Save PDF</button>
                                {
                                    isMobile ? 
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
                                    : null
                                }
                            </div>
                        : null }


                    
                </div> 
                { schedule.length > 0 ? (
                        <>
                        
                        <PDFExport ref={pdfExportComponent} paperSize="A4" scale={1} landscape={false} mobile={true}>
                            
                            <div className="schedule mt-5" ref={contentArea}>
                            <h2>Schedule</h2> 
                            {   schedule.map((obj, i) => (
                            <div className="round-wrapper" id={`round-round${i}`} key={`round-round${i}`}>
                            {[...Object.values(obj)].map((pair, index) => {
                                return (
                                    <>
                                        {index === 0 ? <div id={`round_${i}_${index}`} className="round" key={`round_${i}_${index}`}>{`${i + 1} круг`}</div> : null }
                                        {pair.tour !== null ? <div id={`tour_${i}_${index}`} className="tour" key={`tour_${i}_${index}`}>{`${pair.tour} тур`}</div> : null }

                                        <div 
                                            id={`${transliterate(pair.home)}_${index}_${pair.tour}`} 
                                            ref={scheduleItems} 
                                            className={pair.home === SKIP_TOUR ? 'schedule-item miss' : 'schedule-item pair'}  
                                            key={`${transliterate(pair.home)}_${index}_${pair.tour}`}
                                        >
                                            <div 
                                                className={`${transliterate(pair.home)}`} 
                                                id={`${transliterate(pair.home)}_${pair.id}`} 
                                                key={`${transliterate(pair.home)}_${pair.id}`} 
                                                onClick={e => colorTeamOnClick(e)}
                                            >
                                                <div 
                                                    id={`${transliterate(pair.home)}_${pair.id}_DIV`} 
                                                    key={`${transliterate(pair.home)}_${pair.id}_DIV`}>{pair.home}</div>
                                                <span 
                                                    id={`${transliterate(pair.home)}_${pair.id}_SPAN`} 
                                                    key={`${transliterate(pair.home)}_${pair.id}_SPAN`} 
                                                    className="color-box" onClick={e => clearColor(e)}></span>
                                            </div>
                                            {pair.home === SKIP_TOUR ? null : 
                                                <span id={`${pair.tour}_span`} key={`${pair.tour}_span`} onClick={e => switchTeams(e)}>
                                                    <svg id={`${transliterate(pair.home)}${pair.tour}_svg`} key={`${pair.tour}_svg`} height="512" viewBox="0 0 512 512" width="512"><g><path d="m92.69 216c6.23 6.24 16.39 6.24 22.62 0l20.69-20.69c6.24-6.23 6.24-16.39 0-22.62l-20.69-20.69h284.69c26.47 0 48 21.53 48 48 0 13.23 10.77 24 24 24h16c13.23 0 24-10.77 24-24 0-61.76-50.24-112-112-112h-284.69l20.69-20.69c6.24-6.23 6.24-16.39 0-22.62l-20.69-20.69c-6.23-6.24-16.39-6.24-22.62 0l-90.35 90.34c-3.12 3.13-3.12 8.19 0 11.32z"/><path d="m419.31 296c-6.23-6.24-16.38-6.24-22.62 0l-20.69 20.69c-6.252 6.252-6.262 16.358 0 22.62l20.69 20.69h-284.69c-26.47 0-48-21.53-48-48 0-13.23-10.77-24-24-24h-16c-13.23 0-24 10.77-24 24 0 61.76 50.24 112 112 112h284.69l-20.69 20.69c-6.252 6.252-6.262 16.358 0 22.62l20.69 20.69c6.241 6.241 16.38 6.24 22.62 0l90.35-90.34c3.12-3.13 3.12-8.19 0-11.32z"/></g></svg>
                                                </span>}
                                                
                                            <div 
                                                className={`${transliterate(pair.away)}`} 
                                                id={`${transliterate(pair.away)}_${pair.id}`} 
                                                key={`${transliterate(pair.away)}_${pair.id}`} 
                                                onClick={e => colorTeamOnClick(e)}>
                                                    <div 
                                                        id={`${transliterate(pair.away)}_${pair.id}_DIV`}
                                                        key={`${transliterate(pair.away)}_${pair.id}_DIV`}>{pair.away}</div> 
                                                    <span 
                                                        id={`${transliterate(pair.away)}_${pair.id}_SPAN`} 
                                                        key={`${transliterate(pair.away)}_${pair.id}_SPAN`} 
                                                        className="color-box" 
                                                        onClick={e => clearColor(e)}></span>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            )}
                            </div>
                            )) 
                        }
                            </div>

                            
                            </PDFExport>
                            
                        </>
                    ) : null }
            
            </div>
            
        </div>
        </>
    )
    
})


export default Krug;