// import React from 'react'
import WorkFlow from './WorkFlow'
import icon1 from '../../assets/rings.png'
import icon2 from '../../assets/wedding-2.png'
import icon3 from '../../assets/love-birds.png'
import icon4 from '../../assets/network.png'
import icon5 from '../../assets/chat.png'
import icon6 from '../../assets/wedding-couple.png'

const HowItWorks = () => {
    return (
        <>
            <section className='py-[3rem]  relative'>
                <div className="container">
                    <div className="w-full text-center">
                        <h2 className='section_title'>
                            How it works
                        </h2>
                    </div>

                </div>
                <WorkFlow isOdd={false} title={'Register'} icon={icon1} desc={"Start your journey toward finding your perfect life partner. Sign up today to create your profile and connect with thousands of eligible matches tailored to your preferences."} />
                <WorkFlow isOdd={true} title={'Find your Match'} icon={icon2} desc={"Start your journey toward finding your perfect life partner. Sign up today to create your profile and connect with thousands of eligible matches tailored to your preferences."} />
                <WorkFlow isOdd={false} title={'Send Interest'} icon={icon3} desc={"Start your journey toward finding your perfect life partner. Sign up today to create your profile and connect with thousands of eligible matches tailored to your preferences."} />
                <WorkFlow isOdd={true} title={'Get Profile Information'} icon={icon4} desc={"Start your journey toward finding your perfect life partner. Sign up today to create your profile and connect with thousands of eligible matches tailored to your preferences."} />
                <WorkFlow isOdd={false} title={'Start Meetups'} icon={icon5} desc={"Start your journey toward finding your perfect life partner. Sign up today to create your profile and connect with thousands of eligible matches tailored to your preferences."} />
                <WorkFlow isOdd={true} title={'Getting Marriage'} icon={icon6} desc={"Start your journey toward finding your perfect life partner. Sign up today to create your profile and connect with thousands of eligible matches tailored to your preferences."} />
            </section>
        </>
    )
}

export default HowItWorks