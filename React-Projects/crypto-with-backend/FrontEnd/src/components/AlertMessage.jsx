import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function AlertMessage() {

    const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
        <ToastContainer />
    </div>
  )
}

export default AlertMessage
