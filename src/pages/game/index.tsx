import {useEffect, useState} from 'react'
import styles from './styles.module.scss';

type Dice  = {
    type: string;
    result: string | null
}

const dices = ['green','red','yellow','red','yellow',
'green','green','red','yellow','red','yellow','green','green']

const initialState = dices.map(item=>({type:item, result: null})).slice(0,3)

const getRandomDices = () =>{
    let dicesObj= {} as Record<number,string>
    while(Object.keys(dicesObj).length<3){
       const index = Math.floor(Math.random()*13)
        if(!dicesObj[index]){
            dicesObj[index] = dices[index]
        }
    }
    return Object.values(dicesObj)
}

const initialCount = { brains: 0, shots: 0}
       
const types:Record<string,{type:string,image:string}> = {
    '0' : {type:'Shot',image:'💥'},
    '1' : {type:'Brain', image: '🧠'},
    '2' : {type:'Steps',image: '🦶'}
}

const diceType:Record<string,number[]> = {
    'green': [1,2,1,0,2,1],
    'red': [0,1,0,2,0,2],
    'yellow': [2,1,2,2,1,0]
}

export const Game = () => {

    const [usersPoints, setUsersPoints] = useState<Record<string, number>>({
        1: 0,
        2: 0,
        3: 0,
        4: 0
    });
    const [user, setUser] = useState<number>(1);
    const [userWon, setUserWon] = useState<number | null>(null);
    const [playingDices, setPlayingDices] = useState<Dice[]>(initialState);

    const [roundOver, setRoundOver] = useState<boolean>(false);

    const [count, setCount] = useState(initialCount);

    const handleplay = () =>{
        console.log(getRandomDices().map(item=>({type:item, result: null}))
        )
        setPlayingDices(playingDices.map(dice=>{
            return ({
            ...dice,
            result: diceType[dice.type][Math.floor(Math.random()*6)].toString()
        })}))
    }

    useEffect(() => {

        let newCount: {brains: number, shots: number} = {...count}

        playingDices.forEach(dice=>{
            if(dice.result === '0'){
                newCount = {
                    ...newCount,
                    shots: newCount.shots + 1
                }
            }   
            if(dice.result === '1'){
                newCount = {
                    ...newCount,
                    brains: newCount.brains + 1
                }
            }   
        })
        setCount(newCount)
            if(playingDices.every(dice=> dice.result === '0')) {
            setRoundOver(true)
        }

            
    }, [playingDices]);

    useEffect(() => {
        const winner = Object.values(usersPoints).findIndex(num=> num>=13)
        if(winner>-1){
            setUserWon(winner)
        }
        if(count.shots >= 3){
            setRoundOver(true)
        }
        
    }, [count]);

    const handleNext = () =>{
        setRoundOver(false)
        setUser(prev=> prev === 4 ? 1 : prev+1)
        setUsersPoints(prev=>({
            ...prev,
            [user]:  prev[user] + (count.shots >= 3 ? 0 : count.brains)
        }))
        setPlayingDices(initialState)
        setCount(initialCount)
    }

  return<>
  <div style={{display:'flex',justifyContent: 'space-evenly', marginBottom:'3rem', marginTop:'3rem'}}>
      Users points:
      {
          Object.keys(usersPoints).map((user: string)=>(
              <div key={user}>User {user}: {usersPoints[user]}</div>
          ))
      }
  </div>
  <div>
      User: {user}
  </div>
  <div>
      {roundOver && 'Perdiste este turno!'}
  </div>
  <div>
      Cerebros: {count.brains}
      Disparos: {count.shots}
  </div>
  <div>
      <small>
          Next random three dices: 
      </small>
  </div>
   <div className={styles.Game}>
    {
        playingDices.map(dice=>{
            return (
            <div key={dice.type} style={{backgroundColor:dice.type}}>
                {dice.type}
                <div>
             {dice.result ? types[dice.result].image : ''}
                </div>
            </div>
        )})
    }

  </div>
<div>
<div>
<button disabled={roundOver || (userWon !== null &&userWon >=0)} onClick={handleplay}>
        Play
    </button>
</div>
 <button disabled={userWon !== null &&userWon >=0} onClick={handleNext}>
        Siguiente jugador
    </button>
</div>
<div>
{userWon !== null &&userWon >=0 &&  <h2>User {userWon} is the winner!!</h2>}
</div>
  </>;
};