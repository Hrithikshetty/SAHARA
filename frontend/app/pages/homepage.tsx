"use client";
import Link from "next/link";
import { useState } from 'react'; 
import { Button } from "../components/button";

export default function Component() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const [auth, setAuth] = useState(false); 

  const handleLogin = () => {
    setAuth(!auth); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-8 py-4 bg-gray-100 text-black">
        <div className="flex items-center">
          <Link href="/">
            <MountainIcon className="h-8 w-8" />
          </Link>
          <span className="text-lg font-medium ml-2">SAHARA</span>{" "}
        </div>
        <nav className="md:flex gap-8 hidden">
          <Link href="/pages/login">
            <Button className="text-lg font-medium hover:underline underline-offset-4" variant="outline">Posts</Button>
          </Link>
          <Link href="/pages/login">
            <Button className="text-lg font-medium hover:underline underline-offset-4" variant="outline">Volunteer</Button>
          </Link>
          <Link href="/pages/login">
            <Button className="text-lg font-medium hover:underline underline-offset-4" variant="outline">Analytics</Button>
          </Link>
          <Link href="/pages/login">
            <Button className="text-lg font-medium hover:underline underline-offset-4" variant="outline">Relocate Volunteer</Button>
          </Link>
        </nav>
        <Link href="/pages/login">
          <Button
            className="text-lg font-medium hidden border-black border-2 md:inline-flex p-1 rounded-xl"
            variant="outline"
          >
            Login
          </Button>
        </Link>
        <div className="md:hidden">
          <Button
            onClick={toggleMobileMenu}
            className="inline-flex p-1 rounded-xl  border-black border-2"
            variant="outline"
          >
            Menu
          </Button>
          {isMobileMenuVisible && (
            <div className="absolute top-16 right-0 w-48 py-2 bg-gray-100 rounded-lg shadow-md flex flex-col gap-2">
              <Link href="/pages/login">
                <Button className="p-2" variant="outline">Posts</Button>
              </Link>
              <Link href="/pages/login">
                <Button className="p-2" variant="outline">Volunteer</Button>
              </Link>
              <Link href="/pages/login">
                <Button className="p-2" variant="outline">Analytics</Button>
              </Link>
              <Link href="/pages/login">
                <Button className="p-2" variant="outline">Relocate Volunteer</Button>
              </Link>
              <button className="p-2" onClick={handleLogin}>
                {auth ? 'Logout' : 'Login'} 
              </button>
            </div>
          )}
        </div>
      </header>
      <main className=" bg-gray-100 text-black flex flex-col items-center justify-center flex-grow">
        <div
          id="features"
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto px-8 py-12"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              Welcome to SA<span className="text-green-500">HARA</span> In .
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Support when you need it most...
            </p>
          </div>
          <div className="w-full max-w-md">
            <img
              alt="Chatbot"
              src="https://img.freepik.com/free-vector/patent-law-concept-illustrated_23-2148739016.jpg?size=626&ext=jpg&ga=GA1.1.1359882910.1712348428&semt=aishttps://mymodernmet.com/wp/wp-content/uploads/2023/01/ai-chatbots.jpg"
              className="w-full h-auto object-cover object-center rounded-lg shadow-md"
              style={{
                aspectRatio: "500/500",
                objectFit: "cover",
              }}
            />
            {/* <div className="w-full h-auto object-cover object-center rounded-lg shadow-md">
            <lottie {...props as LottieProps} animationData ={animationData}/>
            </div> */}
          </div>
        </div>

        <section
          id="features"
          className="flex flex-col items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto px-8 py-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Features</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover the amazing features of our app.
          </p>
        </section>
        <section
                    id="about"
                    className="flex flex-col items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto px-8 py-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold">About Application</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Sahara revolutionizes emergency volunteerism with its innovative features like risk-prone analysis and social media integration. Through advanced data analytics, it identifies high-risk areas and optimizes resource allocation for efficient crisis response. Sahara's OTP-secured application ensures the safety of user interactions, while its dual-platform availability on web and mobile facilitates widespread community engagement. With Sahara, we aim to empower communities to mitigate disaster impacts and foster resilience through informed decision-making and coordinated response efforts.
                    </p>
                </section>
        
      </main>
    </div>
  );
}

interface MountainIconProps extends React.SVGProps<SVGSVGElement> { }

function MountainIcon(props: MountainIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
