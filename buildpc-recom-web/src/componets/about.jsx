function about() {
  return (
    <>
      <section
        id="about"
        className="w-screen  h-screen  flex items-center  bg-cover brightness-100 bg-center"
      >
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center brightness-60"
            style={{ backgroundImage: "url('/herobg.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative justify-start ">
          <div className="relative bg-black/60 text-white p-12 max-w-4xl rounded-lg shadow-lg">
            <h2 className="text-3xl  font-bold mb-4">Overview</h2>
            <p className="text-lg  leading-relaxed">
              Building a custom PC can be complex, especially for users
              unfamiliar with hardware compatibility and performance factors.
              Our PC Configuration & Recommendation System simplifies this
              process by providing personalized PC build suggestions based on
              user preferences, budget, and real-world component reviews.
            </p>
            <p className="text-lg mt-4">
              Through an interactive Q&A system, users define their needs, and
              our smart engine filters compatible components, ensuring an
              optimized and functional build. Additionally, we integrate
              sentiment analysis from Reddit to recommend the best-reviewed
              components, helping users make informed decisions.
            </p>
            <p className="text-lg mt-4">
              Our goal is to make PC building simple, efficient, and accessible
              for everyone—whether you're a gamer, content creator, or
              professional.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default about;
