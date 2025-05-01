import React from "react";
import connorPfp from "../../../../public/IMG_9893.jpg";
import domPfp from "../../../../public/Dom.jpg";

const Info: React.FC = () => {
  return (
    <section className="relative w-full h-auto flex flex-col items-center justify-center text-center text-black p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-3xl text-center">
        <p className="text-lg mb-6">
          Welcome to our Hotel Tracker! We hope your experience with us is as smooth as possible. If not please feel free to email us using the emails in our contact page!
        </p>
      </div>
      <h1 className="text-4xl font-bold mb-6 mt-10">Meet the Team!</h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-3xl text-center">
        <p className="text-lg mb-6">
            Our team is comprised of 5 undergraduate Computer Science students from UNC Charlotte and this application is serving as our undergradate capstone project.
            This project is primarily made using React and Typescript, with a Node.js backend, and API calls through Python with Flask. We sourced our hotel data from the Bookings.com API.
        </p>
        <div className="flex items-center gap-4 mb-6 text-left">
            <img src={connorPfp} alt="Team pfp" className="w-24 h-24 rounded-full shadow-md" />
            <div>
                <h4 className="text-xl font-bold">Connor Ayscue</h4>
                <p>Front-End Developer</p>
                <p>cayscue@uncc.edu</p>
            </div>
        </div>

        <div className="flex items-center gap-4 mb-6 text-left">
            <img src="" alt="Team pfp" className="w-24 h-24 rounded-full shadow-md" />
            <div>
                <h4 className="text-xl font-bold">Daniel Remington</h4>
                <p>Front-End Developer</p>
                <p>dremingt@charlotte.edu</p>
            </div>
        </div>

        <div className="flex items-center gap-4 mb-6 text-left">
            <img src="" alt="Team pfp" className="w-24 h-24 rounded-full shadow-md" />
            <div>
                <h4 className="text-xl font-bold">Kha Ho</h4>
                <p>Back-End Developer</p>
                <p>kho7@charlotte.edu</p>
            </div>
        </div>

        <div className="flex items-center gap-4 mb-6 text-left">
            <img src={domPfp} alt="Team pfp" className="w-24 h-24 rounded-full shadow-md" />
            <div>
                <h4 className="text-xl font-bold">Dom Nieban</h4>
                <p>Back-End Developer/Project Manager</p>
                <p>ynieban@uncc.edu</p>
            </div>
        </div>

        <div className="flex items-center gap-4 mb-6 text-left">
            <img src="" alt="Team pfp" className="w-24 h-24 rounded-full shadow-md" />
            <div>
                <h4 className="text-xl font-bold">Mat Jensen</h4>
                <p>Back-End Developer</p>
                <p>mjense13@charlotte.edu</p>
            </div>
        </div>
    </div>
    </section>
  );
};

export default Info;
