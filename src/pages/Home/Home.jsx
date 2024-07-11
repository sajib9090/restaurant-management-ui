const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="flex flex-col justify-center items-center text-center p-6 bg-black bg-opacity-60 min-h-screen">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Welcome to [Restaurant Name]
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-3xl">
          Discover our exquisite menu and enjoy a dining experience like never
          before. Your taste buds are in for a treat!
        </p>
        <button className="bg-[#FF5733] text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[#E74C3C] transition duration-300">
          Explore Menu
        </button>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#333]">
            Special Offers
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Check out our exclusive deals and promotions! Perfect for a
            delightful dining experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605926637512-c8b131444a4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlubmVyfGVufDB8fDB8fHww"
                alt="Offer 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Dinner for Two</h3>
                <p className="text-gray-600">
                  Enjoy a romantic dinner for two at 20% off. Valid this weekend
                  only!
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1628191137549-1c40a5b83dba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Offer 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Family Feast</h3>
                <p className="text-gray-600">
                  Bring your family and get a free dessert with every main
                  course order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
