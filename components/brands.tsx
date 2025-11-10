import Image from "next/image";

export default function Brands() {
  return (
    <div className="max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl my-8 sm:my-10 md:my-12 mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl md:text-2xl text-center font-bold mb-6 sm:mb-8 md:mb-10 px-4 sm:px-0">
        Trusted by Leading Teams and Global Brands
      </h2>
      <div className="grid grid-cols-2 *:pointer-events-none sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 items-center justify-items-center">
        <Image 
          src={'/diniiz.png'}
          alt='Diniiz'
          width={100}
          height={100}
          className="grayscale-70 w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain"
        />
        <Image 
          src={'/reverie.png'}
          alt='Reverie'
          width={120}
          height={100}
          className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain"
        />
        <Image 
          src={'/axion.svg'}
          alt='Axion'
          width={100}
          height={100}
          className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain"
        />
        <Image 
          src={'/green-plus.png'}
          alt='Partner Logo'
          width={100}
          height={100}
          className="w-16 sm:w-20 md:w-24 grayscale-75   lg:w-28 h-auto object-contain"
        />
        <Image 
          src={'/newon.png'}
          alt='Partner Logo'
          width={100}
          height={100}
          className="w-16 grayscale-90 sm:w-20 md:w-24 lg:w-28 h-auto object-contain col-span-2 sm:col-span-1"
        />
      </div>
    </div>
  );
}
