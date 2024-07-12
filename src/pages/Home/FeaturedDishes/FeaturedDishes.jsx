const restaurants = [
  {
    name: "Food Republic",
    description: "A cozy place offering a variety of delicious meals.",
    address: "123 Main Street, Naria, Shariatpur",
    image:
      "https://images.unsplash.com/photo-1533052286801-2385cb274342?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Padma Riverview",
    description: "Enjoy a beautiful riverside view with your meals.",
    address: "Mulfotgonj, Naria, Shariatpur",
    image:
      "https://images.unsplash.com/photo-1546195643-70f48f9c5b87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Shikder Kitchen",
    description: "A family-friendly restaurant with a homely atmosphere.",
    address: "Mirpur-12, Dhaka",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Khan Dhaba",
    description:
      "Traditional and contemporary dishes to satisfy your cravings.",
    address: "Zinda Bazar, Sylhet",
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sam's Fast Food",
    description: "Quick and delicious fast food for everyone.",
    address: "Mohammadpur, Dhaka",
    image:
      "https://images.unsplash.com/photo-1494620531168-6fcc3407322b?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "El Pizzario",
    description: "Delicious pizzas with a variety of toppings.",
    address: "Mirpur-1, Dhaka",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeaturedRestaurants = () => {
  return (
    <div className="featured-restaurants py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Restaurants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="restaurant-card bg-white p-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">{restaurant.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <p className="text-gray-600 mb-4">{restaurant.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
