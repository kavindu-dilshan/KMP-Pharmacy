import mainbanner from '../assets/Main-Banner-1.png'
import NavigationBar from '../components/NavigationBar'
import img1 from '../assets/home-image-1.png'
import img2 from '../assets/home-image-2.png'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className='bg-paleblue'>
        <NavigationBar />
        <div className='relative'>
            <img className='w-full' src={mainbanner} alt="main-banner"/>
            <div className='absolute inset-0 max-w-7xl mx-auto p-3 mt-20'>
                <h1 className='max-w-xl text-5xl leading-tight font-bold text-black'>Never run out of essential drugs to manage your condition</h1>
                <p className='text-black mt-2 text-xl'>Buy prescribed drug to better manage your health</p>
                <button type='submit' className='bg-blue text-white rounded-md px-5 p-3 mt-10 hover:bg-light-blue transition-all'>Upload Prescription</button>
            </div>
        </div>
        <div className='flex max-w-7xl mx-auto justify-between mt-14 mb-14 gap-5'>
            <img src={img1} alt="" className="object-cover w-full h-full"/>
            <img src={img2} alt="" className="object-cover w-full h-full"/>
        </div>
        <Footer />
    </div>
  )
}
