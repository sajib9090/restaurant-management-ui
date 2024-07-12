import { motion } from "framer-motion";
import { StarFilled } from "@ant-design/icons";

const testimonials = [
  {
    name: "Faruque Hossain",
    position: "Food Republic - Chairman",
    testimonial:
      "Ahaar Assist has greatly improved our management efficiency. The support team is always helpful and responsive.",
    rating: 5,
    photo:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1720781013~exp=1720784613~hmac=c69964037e8375dd24feb41577c33f8f7e857c7aabca77a7a94bac468bdf7e85&w=740",
  },
  {
    name: "Ahasan Ahmed",
    position: "Manager",
    testimonial:
      "Using Ahaar Assist has simplified our operations and improved customer satisfaction. Highly recommended!",
    rating: 5,
    photo:
      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?t=st=1720780603~exp=1720784203~hmac=98c8cc85c3d530e309bc72e9e266a1759b666f24b67f766bb4f6c054073adc1a&w=740",
  },
  {
    name: "Anowar Khandakar",
    position: "Admin",
    testimonial:
      "The features provided by Ahaar Assist are just what we needed to streamline our business. Fantastic tool!",
    rating: 5,
    photo:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1720781176~exp=1720784776~hmac=692f503b7350d9a420a1e1004246cb09cff821e5130cea9a80f059c3e31c4f70&w=740",
  },
  {
    name: "Abdur Rashid Khan",
    position: "Chairman",
    testimonial:
      "Ahaar Assist is user-friendly and very efficient. Our staff loves it, and it has made our work much easier.",
    rating: 5,
    photo:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833554.jpg?t=st=1720781143~exp=1720784743~hmac=ad115271fdaa37e9432a0e061a55b6cd185f447f4594b5449685fe5479d9ee07&w=740",
  },
  {
    name: "Sultana Tamannah",
    position: "Sam's Kitchen - Chairman",
    testimonial:
      "Our restaurant's performance has improved significantly since we started using Ahaar Assist. Excellent software!",
    rating: 5,
    photo:
      "https://img.freepik.com/free-photo/portrait-beautiful-girl-yellow-coat-with-backpack_1142-55171.jpg?t=st=1720781086~exp=1720784686~hmac=fec9acf99f88cc845b45c091a9970d2814114987f49b39bca6ae00b1e80e3216&w=740",
  },
  {
    name: "Ahmed Rubel",
    position: "Cashier",
    testimonial:
      "Ahaar Assist has revolutionized the way we manage our restaurant chain. The insights and efficiency it provides are unparalleled.",
    rating: 5,
    photo:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?t=st=1720781120~exp=1720784720~hmac=116c4e4bd728f7d977fb2a55d8bd069f2477ae0b86007cf4711e93e62c273fb0&w=740",
  },
];

const CustomerTestimonials = () => {
  return (
    <div className="customer-testimonials py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  {testimonial.position && (
                    <p className="text-gray-500">{testimonial.position}</p>
                  )}
                  <div className="flex items-center">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <StarFilled key={i} className="text-yellow-500" />
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.testimonial}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
