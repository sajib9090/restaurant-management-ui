

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sajib Hossain",
      position: "CEO/Full Stack Developer",
      image: "https://i.ibb.co/s5GCC0N/sajib-hossain-official1-1-passport.jpg",
    },
    {
      name: "Mominul Hoque",
      position: "UI/UX Designer",
      image: "https://i.ibb.co/YBc8Fd2/Screenshot-2024-07-12-165942.jpg",
    },
    {
      name: "Rakib Ahmed",
      position: "Investor",
      image: "https://i.ibb.co/6RHnZG2/frelanprofile.png",
    },
    {
      name: "Masud Khan",
      position: "Marketing Specialist",
      image: "https://i.ibb.co/JrRTLJL/Masud-1.jpg",
    },
  ];

  return (
    <div className="about-page">
      <section className="history py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Our Story: Building Ahaar Assist
          </h2>
          <p className="text-lg text-center text-gray-600 mb-8">
            Ahaar Assist started with a vision to revolutionize restaurant
            management. Sajib Hossain, our CEO and Full Stack Developer,
            assembled a dedicated team of experts: Mominul Hoque as UI/UX
            Designer, Rakib Ahmed as Investor, and Masud Khan as Marketing
            Specialist.
          </p>
          <h4 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Development and Testing
          </h4>
          <p className="text-lg text-center text-gray-600 mb-8">
            We devoted countless hours to coding, designing, and perfecting
            Ahaar Assist. Mominul created user-friendly designs, while Sajib
            brought these designs to life. Despite numerous technical
            challenges, our commitment remained steadfast. We rigorously tested
            the software, incorporating valuable feedback from restaurant owners
            to ensure high standards of functionality and usability.
          </p>
          <h4 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Launch and Success
          </h4>
          <p className="text-lg text-center text-gray-600 mb-8">
            After months of hard work, we launched Ahaar Assist with a mix of
            excitement and anticipation. Masud's effective marketing strategies
            helped us reach the right audience. Restaurant owners quickly
            recognized the value of Ahaar Assist, leading to a steady growth in
            our subscriber base.
          </p>
          <h4 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Looking Ahead
          </h4>
          <p className="text-lg text-center text-gray-600">
            Today, Ahaar Assist is trusted by numerous restaurants for efficient
            management. Our journey from a simple idea to a widely used software
            highlights our dedication and hard work. As we move forward, we
            remain committed to innovation and excellence, ready to tackle new
            challenges and achieve greater heights.
          </p>
        </div>
      </section>

      <section className="team py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card bg-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-52 object-cover rounded mb-6"
                />
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-lg text-center text-gray-600">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default AboutUs;
