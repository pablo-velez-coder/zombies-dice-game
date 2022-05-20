import { createContext, useContext, useState } from "react";

interface IGame {
    userName:string;
    setUserName: (text:string)=> void;
    mm: number;
}
export const GameContext = createContext<IGame>({
    userName: 'dsa',
    setUserName: ()=> {},
    mm:  0
})

export const GameProvider = ({children}: {children: React.ReactElement}) => {
    const [userName, setUsername] = useState<string>('dsadsa');
    console.log(userName)
    const setUserName = (name:string) =>{
        setUsername(name)
    }
    const states = {
        userName,
        setUserName,
        mm: 1
    }

    return(
        <GameContext.Provider value={states}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext<IGame>(GameContext)