import React, { useState } from 'react';
import PaymentTable from './PaymentTable';

const PaymentAddForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({
    roomNumber: '',
    guestName: '',
    checkInDate: '',
    checkOutDate: '',
    totalNight: '',
    roomPerNight: '',
    additionalCharges: '',
    paymentMethod: '',
    cashReceived: ''
  });
  
  // Function to update state dynamically
  const handleSave = () => {
    if (
      paymentDetails.roomNumber &&
      paymentDetails.guestName &&
      paymentDetails.checkInDate &&
      paymentDetails.checkOutDate &&
      paymentDetails.totalNight &&
      paymentDetails.roomNumber &&
      paymentDetails.additionalCharges &&
      paymentDetails.paymentMethod &&
      paymentDetails.cashReceived
    ) {
      const newFormData = {...paymentDetails};
      setPaymentDetails({
        roomNumber: '',
        guestName: '',
        checkInDate: '',
        checkOutDate: '',
        totalNight: '',
        roomPerNight: '',
        additionalCharges: '',
        paymentMethod: '',
        cashReceived: ''
      });
    } else {
      alert("Please Fill in All Fields")
    }
  };

  const handleDelete = (index: number) => {
    // setPaymentDetails(housekeepingList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number) => {
    // const entry = housekeepingList[index];
    // setRoomNumber(entry.roomNumber);
    // setCleaningDate(entry.cleaningDate);
    // setStatus(entry.status);
    // setSpecialTasks(entry.specialTasks);
    // handleDelete(index);
  };

  return (
    <div className='w-full bg-amber-200 p-6'>
      <h1 className='text-2xl font-bold text-center mb-4'>Bill Payment</h1>
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Open Payment Form
        </button>
        {/* <PaymentTable/> */}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2xl">
            <h2 className="text-xl font-bold mb-4">Bill Payment Form</h2>
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium'>Room Number</label>
                  <input type='text' name="roomNumber" className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, roomNumber: val.target.value})}/>
                </div>
                <div>
                  <label className='block text-sm font-medium'>Guest Name</label>
                  <input type='text' name='guestName' className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, guestName: val.target.value})}/>
                </div>
                <div>
                  <label className='block text-sm font-medium'>Check-In Date</label>
                  <input type='date' name='checkInDate' required className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, checkInDate: val.target.value})}/>
                </div>
                <div>
                  <label className='block text-sm font-medium'>Check-Out Date</label>
                  <input type="date" name='checkOutDate' required className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, checkOutDate: val.target.value})}/>
                </div>
                <div>
                  <label className='block text-sm font-medium'>Total Nights</label>
                  <input type="number" name='totalNights' required className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, totalNight: val.target.value})}/>
                </div>
                <div>
                  <label className='block text-sm font-medium'>Room Per Night</label>
                  <input type="number" name='roomPerNight' required className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, roomPerNight: val.target.value})}/>
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium'>Additional Charges</label>
                <input type="number" name='additionalCharges' required className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, additionalCharges: val.target.value})}/>
              </div>

              <div>
                <label className='block text-sm font-medium'>Payment Method</label>
                <select name="paymentMethod" className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, paymentMethod: val.target.value})}>
                  <option value="">Select Payment Method</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium'>Cash Received</label>
                <input type="number" name='cashReceived' required className='w-full p-2 border rounded' onChange={(val) => setPaymentDetails({...paymentDetails, cashReceived: val.target.value})}/>
              </div>
              
                <div className='text-left text-lg font-bold'>Total: $</div>
                <div className='text-left text-lg font-bold'>Balance: $</div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <PaymentTable paymentList={paymentDetails} onUpdate={handleUpdate} onDelete={handleDelete}/>
    </div>
  );
};

export default PaymentAddForm;
