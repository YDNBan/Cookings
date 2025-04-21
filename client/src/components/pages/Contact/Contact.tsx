import React from "react";

const team = [
    {
      name: "Connor Ayscue",
      role: "Front-End Developer",
      email: "cayscue@uncc.edu"
    },
    {
      name: "Daniel Remington",
      role: "Front-End Developer",
      email: "dremingt@charlotte.edu"
    },
    {
      name: "Dom Nieban",
      role: "Back-End Developer/Project Manager",
      email: "ynieban@uncc.edu"
    },
    {
      name: "Kha Ho",
      role: "Back-End Developer",
      email: "kho7@charlotte.edu"
    },
    {
      name: "Mat Jensen",
      role: "Back-End Developer",
      email: "mjense13@charlotte.edu"
    }
  ];
  
  

const Info: React.FC = () => {
  return (
    <section className="relative w-full h-auto flex flex-col items-center justify-center text-center text-black p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-3xl text-center">
        <p className="text-lg mb-6">
            If you have any problems with the application, or if you have any questions, please feel free to reach out to us at the emails below!
            Please keep in mind we are students and this is our first time working on a project like this, so we may not be able to respond immediately.
            We appreciate your patience and understanding!
        </p>
        <div style={{ textAlign: "left" }} className="gap-4 mb-6 text-left">
  {team.map((member, index) => (
    <div key={index} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <h5 className="text-xl font-bold">{member.name}</h5>
      <p>{member.role}</p>
      <a
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        href={`mailto:${member.email}`}
      >
        {member.email}
      </a>
    </div>
  ))}
</div>           

      </div>
    </section>
  );
};

export default Info;
