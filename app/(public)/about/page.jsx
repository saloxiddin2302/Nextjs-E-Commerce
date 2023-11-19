import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="pt-10 containr">
      <section className="flex justify-between bg-black bg-opacity-20  rounded-md p-6 sm:p-14 md:flex-row flex-col gap-11">
        
      </section>
      <section>
          <div className="flex my-10 justify-between bg-black bg-opacity-20  rounded-md items-center gap-10 flex-col md:flex-row">
          <Card title="Our team of creatives" />
          <Image
            className="w-full md:w-1/2 max-md:order-1 rounded-r-md"
            src="https://img.freepik.com/free-photo/team-business-people-stacking-hands_53876-20873.jpg"
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="flex my-10 justify-between bg-black bg-opacity-20  rounded-md items-center gap-10 flex-col md:flex-row">
          <Image
            className="w-full md:w-1/2 rounded-l-md"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhbXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt=""
            width={200}
            height={200}
          />
          <Card title="Our team of creatives" />
        </div>
      </section>
    </div>
  );
};

const Card = ({ title }) => {
  return (
    <div className="w-full md:w-1/2 max-md:order-2 p-5">
      <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      <h3 className="text-lg sm:text-xl font-semibold py-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt.
      </h3>
      <p className="text-base sm:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor 
      </p>
    </div>
  );
};

export default AboutPage;
