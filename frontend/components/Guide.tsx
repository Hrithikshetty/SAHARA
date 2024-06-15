import Image from 'next/image'
import React from 'react'

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <Image src="/suplogo.jpg" alt="camp" width={50} height={50} />
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          We are here for you
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Guide You to Easy Path</h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum maiores nobis ipsam doloribus dolores enim saepe, consequatur voluptas voluptate id eum obcaecati, cupiditate consequuntur reiciendis neque magnam delectus? Nesciunt, velit?</p>
        </div>
      </div>
    </section>
  )
}

export default Guide