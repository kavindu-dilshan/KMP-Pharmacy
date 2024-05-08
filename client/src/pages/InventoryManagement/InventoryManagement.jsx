import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import { Link } from 'react-router-dom';
import { MdDownload, MdAdd as MdPlus } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


export default function Inventorymanager() {
  const [inventorycount, setInventoryCount] = useState(0);
  const [expiredinventoryCount, setExpiredInventoryCount] = useState(0);
  const [tabletcount, setTabletInventoryCount] = useState(0);
  const [capsulecount, setCapsuleInventoryCount] = useState(0);
  const [liquidcount, setLiquidInventoryCount] = useState(0);
  const [othercount, setOtherInventoryCount] = useState(0);

  const [fullPrice, setfullPrice] = useState(0);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    fetch('http://localhost:3000/api/inventory/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch Inventory:', response.statusText);
          throw new Error('Failed to fetch Inventory');
        }
      })
      .then(data => {
        const inventory = data.inventory;
        setInventoryCount(inventory.length);

        //Implement function to get all value  //Total price is and callback function(A function that is passed as a argument to a another function)
        const totalPrice = inventory.reduce((acc, item) => {
          return acc + (item.Mprice * item.Mquantity);
        }, 0);

        const roundValue = Number(totalPrice).toFixed(2)
        setfullPrice(roundValue);    

        const expiredInventory = inventory.filter(inventory => inventory.status === 'Expired');
        setExpiredInventoryCount(expiredInventory.length);

        const numoftablets = inventory.filter(inventory => inventory.type === 'Tablet')
        setTabletInventoryCount(numoftablets.length);
        const numofcapsules = inventory.filter(inventory => inventory.type === 'Capsule')
        setCapsuleInventoryCount(numofcapsules.length);
        const numofliquid = inventory.filter(inventory => inventory.type === 'Liquid')
        setLiquidInventoryCount(numofliquid.length);
        const numofother = inventory.filter(inventory => inventory.type === 'Other')
        setOtherInventoryCount(numofother.length);

      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };



  const generateReport = () => {
    let yPos = 150; // Define yPos here
    let xPos = 500; // Define xPos here
  
    fetch('http://localhost:3000/api/inventory/read')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to generate report:', response.statusText);
          throw new Error('Failed to generate report');
        }
      })
      .then(data => {
        const items = data.inventory;
        const numoftablets = items.filter(inventory => inventory.type === 'Tablet');
        setTabletInventoryCount(numoftablets.length);
        const numofcapsules = items.filter(inventory => inventory.type === 'Capsule');
        setCapsuleInventoryCount(numofcapsules.length);
        const numofliquid = items.filter(inventory => inventory.type === 'Liquid');
        setLiquidInventoryCount(numofliquid.length);
        const numofother = items.filter(inventory => inventory.type === 'Other');
        setOtherInventoryCount(numofother.length);
  
        const doc = new jsPDF({
          orientation: "portrait",
          unit: 'pt',
          format: "letter"
        });
  
        const inventorySize = data.inventory.length.toString();
  
        const totalPrice = items.reduce((acc, item) => {
          return acc + (item.Mprice * item.Mquantity);
        }, 0);
  
        const totalPrice1 = totalPrice.toFixed(2);
  
        const margin = 40;
  
        doc.setLineWidth(1);
        doc.setDrawColor(0, 90, 139);
        doc.line(30, 30, 580, 30); // Top line
        doc.line(30, 100, 580, 100); // second Top line
        doc.line(580, 780, 580, 30); // Right line
        doc.line(30, 680, 580, 680); // Bottom up line
        doc.line(30, 780, 580, 780); // Bottom line
        doc.line(30, 780, 30, 30); //leftlines
  
        // Title
        doc.setFontSize(30);
        doc.text("Inventory Report", margin, 80);
        doc.setFontSize(15);
  
        doc.setTextColor(0, 0, 255);
        doc.text("Total Value(Rs.):", 375, 80);
        doc.setTextColor(0, 100, 0);
        doc.text(totalPrice1, 490, 80);
  
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text(`Inventory Items(${inventorySize})`, margin, 130);
        doc.setTextColor(0, 0, 0);

        // Inventory items section as a table
        const tableColumns = ["Name", "UnitPrice(Rs)", "Quantity", "Supplier","Status"];
        const tableData = items.map(item => [item.Mname, item.Mprice, item.Mquantity, item.Msupplier,item.status]);
      
        doc.autoTable({
          startY: yPos,
          head: [tableColumns],
          body: tableData,
          theme: "grid",
          margin: { top: 10 },
          styles: { textColor: [0, 0, 0], fontStyle: "bold" , FontSize:"12"},
          columnStyles: {
            0: { fontStyle: "normal" },
            1: { fontStyle: "normal" },
            2: { fontStyle: "normal" },
            3: { fontStyle: "normal" },
            4: { fontStyle: "normal" }
          }
        });
  
        // Counts section
        yPos += 300;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text("Counts", margin, yPos);
        doc.setTextColor(255, 0, 0);
        doc.setFontSize(12);
        yPos += 20;
        doc.text(`- Expired Items: ${expiredinventoryCount}`, margin, yPos);
        doc.setTextColor(0, 128, 0);
        yPos += 20;
        doc.text(`- Active Items: ${inventorySize - expiredinventoryCount}`, margin, yPos);
  
        // Types section
        yPos += 40;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255);
        doc.text("Types", margin, yPos);
        doc.setTextColor(0);
        doc.setFontSize(12);
        yPos += 20;
        doc.text(`- Tablets: ${tabletcount}`, margin, yPos);
        yPos += 20;
        doc.text(`- Capsules: ${capsulecount}`, margin, yPos);
        yPos += 20;
        doc.text(`- Liquid: ${liquidcount}`, margin, yPos);
        yPos += 20;
        doc.text(`- Other: ${othercount}`, margin, yPos);

        yPos += 120;
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 255);
        doc.text("KMP Pharmacy (PVT) LTD", margin, yPos);
        doc.setTextColor(0);

        yPos += 20;
        doc.setTextColor(100, 150, 255);
        doc.setFontSize(10);
        doc.text(`The live status of the inventory on `, margin, yPos);
        doc.setTextColor(0,255,0);
        doc.setFontSize(13);
        doc.text(` ${formatDate(new Date())}`, 190, yPos+1);

        // Add the image to the PDF
        doc.addImage('./logo.png', 'PNG', 430, 708, 110, 40);//x y w h 
        doc.setTextColor(0, 100, 0);

        
        
  
        doc.save('InventoryReport.pdf');
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
          <h1 className='text-3xl font-bold text-blue'>Inventory Management admin Dashboard</h1>
          <div className='flex gap-4'>
            <button onClick={generateReport} className="bg-white hover:bg-light-blue hover:text-white text-black border-2 border-light-blue font-semibold transition-all py-1 px-3 rounded-lg inline-flex items-center">
              <MdDownload className='text-2xl mr-2' />
              <span>Download Report</span>
            </button>
            <div className='flex gap-2 cursor-pointer'>
              <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/127751216?…00&u=f53b685eb62a23a72baeda2f44a671c04b804c86&v=4" alt="profile" />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between font-bold">
                  <h1>Kavindu Dasanayaka</h1>
                </div>
                <p className='text-xs '>Inventory Manager</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-between px-10 text-sm pt-2'>
          <span className='text-2xl font-semibold'>All Inventory Items ({inventorycount})</span>
          <div className='flex gap-2 text-sm mt-2'> 
            <Link to="/create-inventory" className='text-white'>
              <button className='bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg inline-flex items-center py-3 px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out'>
                <MdPlus className='text-2xl mr-2' />
                <span>Add New Inventory Item</span>
              </button>
            </Link>
          </div>
        </div>
        <div className='flex'>
             <div className='ml-10 mt-3 w-40 h-50'>
                <div className='bg-red-100 border-2 border-red-600 font-medium rounded-xl px-4 py-2' >
                  <p className='text-center text-lg'>Expired Items</p>
                  <p className='text-center text-2xl font-bold'>{expiredinventoryCount}</p>
                </div>
              </div>
              <div className='ml-10 mt-3 w-70 h-50'>
                <div className='border-y-light-blue border-2 border-t-blue font-medium rounded-xl px-4 py-2' >
                  <p className='text-center text-lg'>Overall valuation(Rs.)</p>
                  <p className='text-center text-2xl font-bold'>{fullPrice}</p>
                </div>
              </div>

        </div>

        <InventoryTable/>
      </div>
    </div>
  );
}
