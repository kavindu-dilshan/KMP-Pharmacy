import { useState, useEffect } from 'react';
import PrescriptionAssignTable from './PrescriptionAssignTable';
import { Link } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


export default function PrescriptionManagement() {
  const [prescriptionCount, setPrescriptionsCount] = useState(0);
  const [activePrescriptionsCount, setActivePrescriptionsCount] = useState(0);
  const [inactivePrescriptionsCount, setInactivePrescriptionsCount] = useState(0);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = () => {
    fetch('http://localhost:3000/api/prescription/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch prescription:', response.statusText);
          throw new Error('Failed to fetch prescription');
        }
      })
      .then(data => {
        const prescription = data.prescription;
        setPrescriptionsCount(prescription.length);
  
        const activePrescriptions = prescription.filter(prescription => prescription.status === 'Active');
        const inactivePrescriptions = prescription.filter(prescription => prescription.status === 'Inactive');
  
        setActivePrescriptionsCount(activePrescriptions.length);
        setInactivePrescriptionsCount(inactivePrescriptions.length);
      })
      .catch(error => {
        console.error('Error fetching prescription:', error);
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

        const tableHeader = [['Prescription ID', 'First Name', 'Last Name', 'Medication Name', 'Units', 'Created At', 'Status']];

        const tableData = prescription.map(prescription => [
          prescription.PrescriptionID,
          prescription.firstName,
          prescription.lastName,
          prescription.MedicationNames,
          prescription.units,
          formatDate(prescription.createdAt),
          prescription.status
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
          <h1 className='text-4xl font-bold text-blue'>Prescription Assign Page</h1>
          <div className='flex gap-6'>
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
        <div className='px-10 text-2xl font-semibold pt-5'>
          <span className=''>Prescriptions({prescriptionCount})</span>
        </div>
        <PrescriptionAssignTable />
      </div>
    </div>
  )
}
