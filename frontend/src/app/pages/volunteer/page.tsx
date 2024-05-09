"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value: string) => {
    if (selectedInterests.includes(value)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== value));
    } else {
      setSelectedInterests([...selectedInterests, value]);
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            // resolve();
          },
          (error) => {
            console.error("Error getting user location:", error);
            setIsLoading(false);
            reject(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setIsLoading(false);
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await getLocation();
      submitForm();
    } catch (error) {
      console.error("Failed to get location:", error);
    }
  };

  const submitForm = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/volunteer/volunteerer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            phonenumber,
            password,
            latitude,
            longitude,
            interests: selectedInterests,
          }),
        }
      );
      console.log("ha done");
      if (response.ok) {
        router.push("/pages/home");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
      setFirstname("");
      setLastname("");
      setPhonenumber("");
      setPassword("");
      setLatitude(null);
      setLongitude(null);
      setSelectedInterests([]);
    }
  };

  const interests = [
    "Assistance for Road Accident Victims",
    "Response to Robbery Incidents",
    "Blood Donation Requests",
    "Organ Donation Requests",
    "Support for Orphanages and Elderly Homes",
    "Assistance in Finding Missing Persons",
    "Reporting and Addressing Fraud Cases",
    "Lost and Found Item Assistance",
    "Medicine Procurement Support",
    "Water Flooding Reports",
    "Noise Disturbance Complaints",
    "Road Obstructions",
    "Fresh Food Accessibility Issues",
    "Healthcare Accessibility Challenges",
    "Waste Disposal Problems",
    "Safety Hazards",
    "Property Vandalism",
    "Animal Rescue Operations",
    "Wildlife Habitat Displacement",
  ];

  return (
    <div className="w-full lg:p-20 pt-10 flex justify-center items-center">
      <div className="w-1/2 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Become a Volunteer</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to sign up as a volunteer.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone"
              type="tel"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pb-40 space-y-2">
            <Label>Interested In volunteering for</Label>
            <div className="relative">
              <div
                className="border text-gray-500 dark:text-gray-400 border-gray-300 rounded-md p-2"
                onClick={toggleDropdown}
              >
                <div className="flex justify-between items-center">
                  <span>
                    {selectedInterests.length > 0
                      ? selectedInterests.join(", ")
                      : "Select interests"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {isOpen && (
                <div className="absolute  rounded-md p-2 mt-1 w-full max-h-36 overflow-y-auto">
                  <div className="space-y-1">
                    {/* Checkboxes for interests */}
                    {interests.map((interest) => (
                      <div key={interest}>
                        <input
                          type="checkbox"
                          id={interest}
                          value={interest}
                          onChange={() => handleCheckboxChange(interest)}
                          checked={selectedInterests.includes(interest)}
                        />
                        <label htmlFor={interest}>{interest}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pb-10 pt-10 flex space-x-2">
            <Button type="button" onClick={getLocation}>
              Get Location
            </Button>
            <span>
              {latitude !== null && longitude !== null
                ? "Fetched"
                : ""}
            </span>
          </div>

          <Button type="submit" disabled={isLoading}>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
