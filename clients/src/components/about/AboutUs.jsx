import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-gray-600 sm:text-xl max-w-3xl mx-auto">
            We are a team of passionate individuals dedicated to bringing you
            the best online business experience. Our mission is to empower
            businesses and individuals to connect, trade, and grow through our
            platform.
          </p>
          {/* <div className="mt-8 flex justify-center">
            <button className="px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              Learn More
            </button>
          </div> */}
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 sm:text-lg">
                Our mission is to create a seamless online marketplace that
                connects buyers and sellers from all walks of life. We strive to
                provide a platform that is user-friendly, secure, and efficient,
                enabling businesses to thrive and consumers to find what they
                need easily.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 sm:text-lg">
                We envision a world where online commerce is not only accessible
                but also enjoyable for everyone. We aim to be the leading
                platform that people trust for their online shopping and selling
                needs, fostering a community of fairness, transparency, and
                innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center  shadow-md">
                <img
                  src="/images/blog-header.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h2 className="text-xl font-bold text-gray-800 mt-4">
                  Davy Kennang
                </h2>
                <p className="text-black font-bold">CEO & Founder</p>
                <p className="text-gray-600 mt-2">
                  Davy leads our team with a vision for innovation and
                  excellence.
                </p>
              </div>
              <div className="text-center shadow-md">
                <img
                  src="/images/blog-header.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h2 className="text-xl font-bold text-gray-800 mt-4">
                  Atum Kum
                </h2>
                <p className="text-black font-bold">General mananger</p>
                <p className="text-gray-600 mt-2">
                  Atum is a pationate and ambitious young man with a very big
                  vision
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                We believe in conducting business with honesty and transparency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Customer First
              </h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We strive to
                exceed their expectations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We are constantly looking for ways to innovate and improve our
                platform to better serve our users.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
