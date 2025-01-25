"use client";
import axios from "axios";
import React from "react";

function Upgrade() {
 const OnCheckoutClick = async () => {
  //try {
    const result = await axios.post("/api/payment/checkout", {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    });

    console.log(result.data);
    window.open(result.data?.url)

    //if (result.data.url) {
    //  window.location.href = result.data.url;
   // } else {
   //   console.error("Stripe checkout URL not returned");
   // }
 // } catch (error) {
  //  console.error("Error during checkout:", error.response?.data || error.message);
  //}
};


  const plans = [
    {
      name: "5 Courses for Free",
      description: "Get access to 5 courses of your choice for free.",
      price: "Free",
      features: ["Access to 5 courses", "No time limit", "Basic support"],
      buttonText: "Get Started",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      onClick: () => {
        console.log("Free plan selected");
        // Add logic for "5 Courses for Free" button click here
      },
    },
    {
      name: "Monthly Unlimited",
      description: "Unlimited access to all courses for one month.",
      price: "₹59/month",
      features: ["Unlimited course access", "Priority support", "Cancel anytime"],
      buttonText: "Upgrade Now",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white",
      onClick: OnCheckoutClick, // Fixed: Calling the checkout function properly
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Upgrade Plan
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {plan.name}
            </h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <p className="text-2xl font-bold text-gray-800 mb-4">{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={plan.onClick} // Invokes the appropriate function
              className={`w-full py-2 rounded-lg font-medium ${plan.buttonStyle}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
