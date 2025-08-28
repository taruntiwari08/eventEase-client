"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import {IconAnalyzeFilled,IconHeart, IconRouteAltLeft} from "@tabler/icons-react";
import {  CreditCard, Star, TicketIcon, Wallet, ChartArea } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSectionOne() {
  return (
    <div
      className="relative mx-auto flex max-w-8xl flex-col items-center justify-center bg-gradient-to-r from-black via-blue-800 to-black ">
      <div
        className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Book the Best Moments with Ease"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400">
         Plan your perfect outing with ease – book tickets, explore events, and create lasting memories, all in just a few clicks.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/events" className="pointer-none">
            <button
            className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
            </button>
          </Link>
          <Link to="/contact" className="pointer-none"> 
          <button
            className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
          </Link>
        </motion.div>

      </div>
    </div>

  );
}



export function FeaturesSection() {
  const features = [
    {
      title: "Built for Event Lovers",
      description:
        "Designed for organizers, attendees, and everyone who loves seamless event experiences",
      icon: <TicketIcon />,
    },
    {
      title: "Personalized Recommendations",
      description:
        "Discover events tailored to your interests",
      icon: <Star />,
    },
    {
      title: "Hassle Free & Secure Payments",
      description:
        "Fast & secure transactions with multiple payment options",
      icon: <CreditCard />,
    },
    {
      title: "Wallet Points & Rewards",
      description: "Earn 5% back in wallet points & Redeem with zero fees",
      icon: <Wallet/>,
    },
    {
      title: "24/7 Support",
      description: "We’re always here to help you enjoy stress-free bookings",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Analytics for Organizers",
      description:
        "Track ticket sales, engagement, and audience insights with ease",
      icon: <IconAnalyzeFilled />,
    },
    {
      title: "Real-time Event Chat",
      description:
        "Chat with attendees, share updates, and network live",
      icon: <ChartArea />,
    },
    {
      title: "And Many More",
      description: "The list doesn’t end here—discover more inside",
      icon: <IconHeart />,
    },
  ];
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mt-3  relative z-10 px-28 py-10 max-w-8xl mx-auto bg-gradient-to-r from-black via-blue-800 to-black ">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature my-4 dark:border-slate-200",
        (index === 0 || index === 4) && "lg:border-l dark:border-slate-200",
        index < 4 && "lg:border-b dark:border-slate-200"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-900 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-900 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};




