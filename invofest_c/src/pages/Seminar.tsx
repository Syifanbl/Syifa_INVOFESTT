import { Button } from "../components/Button";
import SpeakerCard from "../components/ui/SpeakerCard";
import { Link } from "react-router-dom";


export default function Seminar() {
  const speakers = [
    {
      name: "Dery Agung Triyadi",
      role: "Aws Indonesia",
      imageUrl: "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png",
    },
    {
      name: "Sowam Habibi",
      role: "Google Indonesia",
      imageUrl: "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png",
    },
    {
      name: "Lhuqita Fazry",
      role: "Mobile Development Developer, Founder Rumah Coding Indonesia",
      imageUrl: "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png",
    },
  ];

  return (
    <div>
      <section
        id="hero"
        className="py-10 flex gap-10 justify-between items-center "
      >
        <div className="w-2/3 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-[#7A1E3A] font-bold text-3xl sm:text-4xl lg:text-5xl"
            >
              Seminar
            </h1>

            <p
              data-aos="fade-right"
              data-aos-delay="400"
              className="text-[#7A1E3A] text-lg sm:text-xl font-medium"
            >
              “Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif”
            </p>
          </div>

          <p>
            Seminar nasional yang membahas strategi dan arsitektur teknologi untuk menciptakan <br/> 
            sistem di mana manusia dan AI bekerja sebagai mitra yang sinergis. Yang bertujuan <br/>
            mengubah paradigma dari persaingan menjadi kolaborasi, serta meningkatkan <br/> pengetahuan 
            peserta dalam merancang teknologi AI yang berpusat pada manusia.
          </p>

          <div className="flex gap-3">
          <Link to="/login">
          <Button label="Daftar Sekarang" variant="primary" />
           </Link>
          </div>
        </div>
        
        <div className="w-1/3">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
            alt="Maskot Seminar"
          />
        </div>
      </section>

      <div
        id="description"
        className="bg-[#fce7f3] py-24 px-4 mt-10 text-center"
        style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}
      > <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-[#801b3f] mb-8 racking-wide">
            Tentang IT Seminar
       
          </h2>
          <p className="text-gray-700 max-w-5xl mx-auto leading-loose text-lg text-justify md:text-center">
            Seminar bertajuk “Human-AI Integration: Merancang Arsitektur Kolaboratif, Di tengah pesatnya kemajuan 
            kecerdasan buatan (AI), narasi yang sering muncul adalah tentang persaingan antara manusia dan mesin. 
            Kekhawatiran akan penggantian peran manusia oleh teknologi cerdas menjadi diskusi utama di berbagai sektor.
            Namun, bagaimana jika kita mengubah paradigma tersebut? Seminar Nasional Teknologi Informasi ini hadir 
            untuk menjawab tantangan itu dengan mengangkat tema "Human-AI Integration: Merancang Arsitektur Kolaboratif,
            Bukan Kompetitif.” Kami bertujuan untuk menggeser fokus dari ketakutan akan kompetisi menjadi eksplorasi 
            peluang kolaborasi. Seminar ini akan mengupas tuntas bagaimana kita dapat merancang sistem, etika, dan 
            lingkungan kerja di mana AI berfungsi sebagai mitra yang memperkuat kecerdasan, kreativitas, dan 
            produktivitas manusia—bukan sebagai pengganti.
          </p>
        </div>
      </div>

      <section id="speakers" className="max-w-7xl mx-auto py-24"> 
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#801b3f]">
            Temui Pembicara Khusus Kami
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-3"> 
          {speakers.map((speaker, index) => ( 
            <SpeakerCard 
              key={index} 
              name={speaker.name} 
              role={speaker.role} 
              imageUrl={speaker.imageUrl} 
            /> 
          ))} 
        </div> 
      </section> 
    </div>
  );
}