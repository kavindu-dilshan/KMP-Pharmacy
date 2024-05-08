import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import { Link } from 'react-router-dom';
import { MdDownload, MdAdd as MdPlus } from 'react-icons/md';
import SideBar from '../../components/SideBar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BiFontSize } from 'react-icons/bi';

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
        
        
        var imgData = 'data:image/png;base64,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';

        // Add the image to the PDF
        doc.addImage(imgData, 'JPEG', 430, 708, 110, 40);  //x y w h
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
