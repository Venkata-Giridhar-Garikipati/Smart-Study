"use client";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Upgrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const OnCheckoutClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.post("/api/payment/checkout", {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
      });

      if (result.data?.url) {
        window.open(result.data.url);
      } else {
        throw new Error("Checkout URL not received");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to initiate checkout");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "5 Courses for Free",
      description: "Get access to 5 courses of your choice for free.",
      price: "Free",
      features: ["Access to 5 courses", "No time limit", "Basic support"],
      buttonText: "Get Started",
      popular: false,
      onClick: () => {
        console.log("Free plan selected");
      },
    },
    {
      name: "Monthly Unlimited",
      description: "Unlimited access to all courses for one month.",
      price: "₹59/month",
      features: [
        "Unlimited course access",
        "Priority support",
        "Cancel anytime",
        "Download resources",
        "Certificate of completion"
      ],
      buttonText: "Upgrade Now",
      popular: true,
      onClick: OnCheckoutClick,
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
            Choose Your Learning Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your learning goals. Upgrade anytime to unlock more features.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl
                ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800">
                  {plan.price}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={plan.onClick}
                disabled={loading && plan.popular}
                className={`w-full h-12 text-lg font-medium transition-all duration-300
                  ${plan.popular 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }
                `}
              >
                {loading && plan.popular ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  plan.buttonText
                )}
              </Button>

              {plan.popular && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure payment powered by Stripe
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>Need help choosing? Contact our support team</p>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;