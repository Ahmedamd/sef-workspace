import { People } from '@material-ui/icons';
import React , { useContext,useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext();

 export function useContacts(){
          return useContext(ContactsContext);
      }

export function ContactsProvider({children}) {

     const [contacts, setContacts] = useLocalStorage('contacts', []);
    //   const [ contacts, setContacts] = useState([]);
      function createContact ({user}){
            setContacts(prevContacts =>{
            return[...prevContacts,{username: user?.displayName,userid: user?.uid}]
            })
        
        }


    return (
        <div>
            <ContactsContext.Provider value={{contacts, createContact}} >

                {children}

            </ContactsContext.Provider>

            
        </div>
    )
}
