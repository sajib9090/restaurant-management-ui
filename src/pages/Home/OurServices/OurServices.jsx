import { motion } from "framer-motion";

const services = [
  {
    title: "Manage Users",
    description:
      "Easily create, edit, and delete user accounts for your restaurant. Ensure your staff have the appropriate access levels and permissions.",
    icon: "👥",
  },
  {
    title: "Table Management",
    description:
      "Organize your restaurant seating by creating, editing, and deleting tables. Optimize table arrangements to enhance customer experience.",
    icon: "🍽️",
  },
  {
    title: "Category & Menu Item Management",
    description:
      "Effortlessly add, edit, and remove categories and menu items. Keep your menu up-to-date and organized.",
    icon: "📋",
  },

  {
    title: "Member Management",
    description:
      "Manage your restaurant's membership program by adding, editing, and deleting member details. Offer special deals and track member activity.",
    icon: "👥",
  },
  {
    title: "Dynamic Member Discounts",
    description:
      "Set dynamic discounts for members. Track and adjust discount rates based on member activity and loyalty.",
    icon: "💸",
  },
  {
    title: "Member Purchase Records",
    description:
      "View detailed purchase records for each member. Understand purchasing behavior and tailor marketing strategies.",
    icon: "📜",
  },
  {
    title: "Billing & Discounts",
    description:
      "Handle billing processes seamlessly and apply discounts as needed. Improve customer satisfaction with efficient billing solutions.",
    icon: "💳",
  },
  {
    title: "Sales Reports",
    description:
      "Generate comprehensive daily and monthly sales reports. Analyze detailed tables showing dates, items sold, and quantities.",
    icon: "📊",
  },
  {
    title: "Daily Sales Calculation",
    description:
      "Automatically calculate daily sales totals. Monitor your daily revenue and identify trends quickly.",
    icon: "📅",
  },
  {
    title: "Sales Record Queries",
    description:
      "Query sales records for any time period. Get detailed insights into your sales performance at any given time.",
    icon: "🔍",
  },
  {
    title: "Staff Performance",
    description:
      "Track staff performance by recording sales made by each staff member. Identify top performers and areas for improvement.",
    icon: "🧑‍🍳",
  },
  {
    title: "Employee List & Salary",
    description:
      "Manage your employee list with dynamic salary sheets. Ensure accurate and timely salary disbursements.",
    icon: "💼",
  },
  {
    title: "Expense Reports",
    description:
      "Generate detailed expense reports to keep track of your restaurant's expenditures. Manage your budget effectively.",
    icon: "📉",
  },
  {
    title: "Profit & Loss Calculation",
    description:
      "Calculate your restaurant's total profit and loss. Get a clear picture of your financial health.",
    icon: "📈",
  },
  {
    title: "Supplier Details",
    description:
      "Manage supplier details and keep accurate records. Ensure smooth supply chain operations.",
    icon: "📦",
  },
  {
    title: "Brand Management",
    description:
      "Add, remove, and edit brand logos and information dynamically. Maintain a consistent brand image.",
    icon: "🏷️",
  },
  {
    title: "Profile Management",
    description:
      "Edit your profile information easily. Keep your personal and professional details up-to-date.",
    icon: "👤",
  },

  {
    title: "Void Transactions",
    description:
      "Maintain accurate records of void transactions for any incorrect sales. Ensure transparency and accountability in your sales process.",
    icon: "❌",
  },
];

const OurServices = () => {
  return (
    <div className="our-services py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card bg-white p-6 rounded shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="text-6xl">{service?.icon}</div>
              <h3 className="mt-4 text-2xl font-bold">{service?.title}</h3>
              <p className="mt-2 text-gray-600">{service?.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
