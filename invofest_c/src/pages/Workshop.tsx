import { Button } from "../components/Button";
import SpeakerCard from "../components/ui/SpeakerCard";

export default function Workshop() {
  const speakers = [
    {
      name: "Lhuqita Fazry",
      role: "Mobile Development Developer",
      imageUrl: "https://www.invofest-harkatnegeri.com/assets/workshop/workshop mobile.png",
    },
    {
      name: "M. Dendi Purwanto",
      role: "Artificial Intelligence",
      imageUrl: "https://www.invofest-harkatnegeri.com/assets/workshop/workshop AI.png",
    },
    {
      name: "Danang Avan M",
      role: "Cyber Security",
      imageUrl: "https://www.invofest-harkatnegeri.com/assets/workshop/talkshow cyber.png" ,
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
              IT Workshop
            </h1>

            <p
              data-aos="fade-right"
              data-aos-delay="400"
              className="text-[#7A1E3A] text-lg sm:text-xl font-medium"
            >
              “AI for a Sustainable Future: The Role of Z Generation in the Digital Era”
            </p>
          </div>

          <p>
            IT Workshop ini menjembatani antara potensi Generasi Z dan kekuatan
            AI untuk menciptakan <br /> masa depan yang berkelanjutan. Peserta akan
            dibekali wawasan dan alat untuk mentransformasi<br />  ide-ide inovatif
            menjadi solusi lingkungan yang nyata  dan terukur di era digital.
          </p>

          <div className="flex gap-3">
           <a href="/login">
          <Button label="Daftar Sekarang" variant="primary" />
          </a>
          </div>
        </div>
        
        <div className="w-1/3">
          <img
            src="https://www.invofest-harkatnegeri.com//assets/Maskot-Workshop.png"
            alt="Maskot Seminar"
          />
        </div>
      </section>

      <div
        id="description"
        className="bg-[#fce7f3] py-24 px-4 mt-10 text-center"
        style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}
      > <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#801b3f] mb-8 racking-wide">
            Tentang IT Workshop
       
          </h2>
          <p className="text-gray-700 max-w-5xl mx-auto leading-loose text-lg text-justify md:text-center">
            Workshop “AI for a Sustainable Future: The Role of Z Generation in the Digital Era” ini didesain 
            khusus untuk Generasi Z, para digital natives yang berada di persimpangan antara inovasi teknologi
            dan tantangan keberlanjutan global. Peserta akan diajak untuk menyelami bagaimana Kecerdasan Buatan (AI)
            bukan hanya sekadar teknologi canggih, tetapi juga alat yang ampuh untuk menciptakan solusi nyata bagi
            isu-isu lingkungan. Melalui sesi inspiratif, pengenalan konsep, dan praktik langsung (hands-on), workshop
            ini bertujuan memberdayakan Gen Z untuk menjadi agen perubahan di era digital, menggunakan keahlian mereka
            untuk masa depan bumi yang lebih baik.
          </p>
        </div>
      </div>

      <section id="speakers" className="max-w-7xl mx-auto py-24"> 
        <div className="text-center mb-16">
          <h2 className="text-4xl text-[#801b3f]">
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