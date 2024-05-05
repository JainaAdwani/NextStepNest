import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaRegArrowAltCircleRight, FaArrowRight } from 'react-icons/fa';
import introVideo from '../assests/Intro.mp4';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex gap-16 p-28 px-5 max-w-6xl mx-auto justify-between'>
        <div className='flex-col'>
          <h1 className='text-yellow-950/70 font-bold text-lg lg:text-2xl mt-36 mb-6'>
            Find your perfect <span className="text-yellow-950/80 font-serif">NEST</span>,
            <br/> with NextStepNest.
          </h1>
          <Link
            to={'/search'}
            className='flex gap-2 text-rose-700 font-bold hover:underline hover:text-xl'>
            Let's Get Started
            <div className="justify-between mt-1">
                <FaRegArrowAltCircleRight/>
            </div>
          </Link>
        </div>
        <div className='justify-end ml-14'>
          <img src="./Hero_House2.png" alt='House' className='size-full'/>
        </div>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent Individual like MAKINO WITH BUTTON TO NAVIGATE*/}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sky-800 hover:underline hover:text-sky-700 hover:font-medium' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sky-800 hover:underline hover:text-sky-700 hover:font-medium' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sky-800 hover:underline hover:text-sky-700 hover:font-medium' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>



      {/*ABout Us Video like gpoyal*/}
      <div className='flex justify-center mt-24'>
        {/*Left */}
        <div className='mr-28 border-y-2 border-yellow-900/50 font-serif'>
          <h1 className='text-2xl mt-24'>Aiding People <span className='font-bold'>Since 2001</span></h1>
          <p className='mt-4'>
          NextStepNest isn't just a platform to buy and sell properties;<br/>
          it's your stepping stone to a brighter future.<br/>
          We believe buying or selling a house is a significant life event,<br/>
          and we're here to guide you through every step of the process.<br/>
          </p>
          <Link
            to={'/about'}
            className='flex gap-3 text-white font-bold border-2 w-32 bg-lime-700/80 border-lime-700/80 rounded-full ps-2 pe-2 mt-16 hover:text-lg hover:w-36'>
            About Us
            <div className="justify-between mt-1">
              <FaArrowRight />
            </div>
          </Link>
        </div>
        {/*Rigth */}
        <div className='ml-28'>
          <video src={introVideo} autoPlay loop muted width={450} />
        </div>
      </div>



      {/*What we believe section */}








    </div>
  );
}
