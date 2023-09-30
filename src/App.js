import Form from './Form';
import Reservations from './Reservations';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const defaultFormValue = {
    id:-1,
    reservation_first_name: '',
    reservation_last_name: '',
    phone_number: '',
    reservation_datetime: '',
    reservation_date: '',
    number_of_guests: '',
  };
  const [selectedCardId, setValue] = useState(0);
  const [userData, setUserValue] = useState(defaultFormValue);

  useEffect(() => {
    if(userData['id'] != -1){
      setValue(0);
    }
  }, [userData]);

  function handleFormChange() {
    if(selectedCardId == 0){
      setUserValue(defaultFormValue);
    }
    setValue(selectedCardId == 1 ? 0 : 1)
  }
  
  return (
    <div className="App bg-dark">
        <div className='container-fluid d-flex flex-column justify-content-center h-100 px-5'>
          <div className='d-flex flex-row h-100 align-items-center' style={{overflowX: 'hidden'}}>
            <div style={{minWidth:'50%', maxWidth:'50%'}}>
              <AnimatePresence initial={false}>
                { selectedCardId == 0 && <Form defaultFormValue={defaultFormValue} userData={userData} setUserValue={setUserValue}/> }
              </AnimatePresence>
            </div>
            <motion.div 
              initial={{ opacity: 0, x:600}}
              animate={{ opacity: 1, x:selectedCardId == 0 ? 600 : 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className='position-absolute p-5'
              style={{minHeight: '400px', maxHeight: '400px', maxWidth: '45vw'}}>
              <h1 className='text-light'>Make your reservation.</h1>
              <div className='container px-2'>
                  <button 
                    onClick={() => handleFormChange()} 
                    className='btn btn-primary btn-lg mx-2'>{selectedCardId == 1 ? 'Make Reservation' : 'View Reservations'}</button>
              </div>
            </motion.div>
              <AnimatePresence initial={false}>
                { selectedCardId == 1 && <Reservations setUserValue={setUserValue}/> }
              </AnimatePresence>
          </div>
        </div>
        <ToastContainer />
    </div>
  );
}

export default App;
