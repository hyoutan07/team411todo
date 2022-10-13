import * as React from 'react';

const SAVE_TOKEN_KEY = "tanakasugiyamahyutainamura"

// UserContext が保持する値の型
export interface jwtTokenContextType {
    token: string;
    setToken: (token: string) => void;
}

export const jwtTokenContext = React.createContext<jwtTokenContextType>({
    token: "aaaaaaaa",  // デフォルト値
    setToken: (token: string) => { }  // ダミーセッター
});
// window.localStorage.getItem(SAVE_TOKEN_KEY)

// jwtTokenContext にセッター関数を登録するためのコンポーネント
const JwtTokenContextProvider = ({ children }) => {
    const context: jwtTokenContextType = React.useContext(jwtTokenContext);
    const [token, setToken] = React.useState(context.token);

    const newContext: jwtTokenContextType = {
        token,
        setToken: (token: string) => {
            window.localStorage.setItem(SAVE_TOKEN_KEY, token);
            setToken(token);
        }
    };

    React.useEffect(() => {
        setToken(window.localStorage.getItem(SAVE_TOKEN_KEY));
        // console.log(token)
    },[])
    
    return (
        <jwtTokenContext.Provider value={newContext}>
            {children}
        </jwtTokenContext.Provider>
    );
};

export default JwtTokenContextProvider