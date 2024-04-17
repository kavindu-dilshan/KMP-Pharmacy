import { useState, useEffect } from 'react';
import PrescriptionTable from './PrescriptionTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function PrescriptionManagement() {
  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [activePrescriptionCount, setActivePrescriptionCount] = useState(0);
  const [inactivePrescriptionCount, setInactivePrescriptionCount] = useState(0);

  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPrescription = () => {
    fetch('http://localhost:3000/api/prescription/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch Prescription:', response.statusText);
          throw new Error('Failed to fetch prescription');
        }
      })
      .then(data => {
        const Prescription = data.prescription;
        setPrescriptionCount(Prescription.length);
  
        const activePrescription = Prescription.filter(prescription => prescription.status === 'Active');
        const inactivePrescription = Prescription.filter(prescription => prescription.status === 'Inactive');
  
        setActivePrescriptionCount(activePrescription.length);
        setInactivePrescriptionCount(inactivePrescription.length);
      })
      .catch(error => {
        console.error('Error fetching Prescription:', error);
      });
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
};

  const generateReport = () => {
    fetch('http://localhost:3000/api/prescription/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to generate report:', response.statusText);
          throw new Error('Failed to generate report');
        }
      })
      .then(data => {
        const prescription = data.prescription;

        const doc = new jsPDF();

        const tableHeader = [['Prescription ID', 'First Name', 'Last Name', 'age', 'contactNo', 'Medication Name', 'Units', 'notes']];

        const tableData = prescription.map(prescription => [
            prescription.PrescriptionID,
            prescription.firstName,
            prescription.lastName,
            prescription.age,
            prescription.contactNo,
            prescription.MedicationNames,
            prescription.units,
            prescription.notes
        ]);

        doc.autoTable({
          head: tableHeader,
          body: tableData,
        });

        doc.save('Prescription Management Report.pdf');
      })
      .catch(error => {
        console.error('Error generating report:', error);
      });
  };
  

  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-1'>
        <div className='bg-paleblue justify-between flex px-10 py-10'>
          <h1 className='text-4xl font-bold text-blue'>Prescription Management Dashboard</h1>
          <div className='flex gap-6'>
            <button onClick={generateReport} className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-2 px-4 rounded-lg inline-flex items-center">
              <MdDownload className='text-2xl mr-2' />
              <span>Download Report</span>
            </button>
            <div className='flex gap-2 cursor-pointer'>
            <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/130960790?s=96&v=4" alt="profile" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between font-bold">
                <h1>Mohamed Shahmi</h1>
              </div>
              <p className='text-xs '>Prescription Manager</p>
            </div>
            </div>
          </div>
        </div>
        <div className='flex items ml-10 justify-between mt-7'>
        <div className='text-2xl font-semibold pt-1 p-3 w-fit'>Prescriptions({prescriptionCount})</div>

            <div className='flex gap-3'>
            <div className='flex  gap-2 mr-10 text-sm text-center'>
            <div><Link to="/create-prescription" className='bg-light-blue text-white hover:bg-blue font-semibold rounded-lg inline-block w-full p-3'>Create New Prescription</Link></div>
            <div><Link to="/prescription-assign" className='bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg inline-block w-full p-3'>Assign page </Link></div>
            <div><Link to="/inventory-management" className='bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg inline-block w-full p-3'>Check Inventory </Link></div>
            <div><Link to="/user-payment" className='bg-light-blue text-white hover:bg-blue transition-all font-semibold rounded-lg inline-block w-full p-3'>Check Payment </Link></div>
          </div>
        </div>
        </div>
        <PrescriptionTable />
      </div>
    </div>
  )
}
