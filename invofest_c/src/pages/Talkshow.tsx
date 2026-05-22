import { Button } from "../components/Button";

export default function Talkshow() {
  return (
    <div>
     
      <section
        id="hero"
        className="py-10 flex gap-10 justify-between items-center px-4 max-w-7xl mx-auto"
      >
        <div className="w-2/3 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-[#7A1E3A] font-bold text-3xl sm:text-4xl lg:text-5xl"
            >
               IT Talkshow
            </h1>
            <p
              data-aos="fade-right"
              data-aos-delay="400"
              className="text-[#7A1E3A] text-lg sm:text-xl font-medium"
            >
              “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan”
            </p>
          </div>

          <p className="text-gray-800 leading-relaxed">
            Talkshow “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan”
            Sebuah  diskusi <br/>interaktif yang mengeksplorasi cara mengintegrasikan nilai-nilai 
            kemanusiaan seperti etika,<br/> empati, dan kreativitas ke dalam pengembangan kecerdasan buatan. 
            yang bertujuan <br/> menginspirasi audiens untuk membangun dan memanfaatkan AI sebagai alat <br/>kolaboratif
            yang memperkuat potensi unik manusia, bukan sebagai penggantinya.
          </p>

          <div className="flex gap-3">
           <Button label="Daftar Sekarang" variant="primary" /> 
          </div>
        </div>
        
        <div className="w-1/3">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png"
            alt="Maskot Mic"
          />
        </div>
      </section>

      <div
        id="description"
        className="bg-[#fce7f3] py-24 px-4 mt-10 text-center"
        style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-[#801b3f] mb-8 tracking-wide">
            Tentang IT Talkshow
          </h2>
          <p className="text-gray-700 max-w-5xl mx-auto leading-loose text-lg">
            Seiring teknologi, khususnya kecerdasan buatan (AI), yang semakin meresap ke dalam setiap 
            aspek kehidupan kita, muncul sebuah pertanyaan fundamental: Apakah kita sedang menciptakan 
            teknologi yang melayani manusia, atau justru sebaliknya? Untuk menjawab pertanyaan tersebut,
            kami mempersembahkan talkshow berskala nasional: “Humanizing Technology: Kolaborasi Manusia
            dan AI di Masa Depan.” Acara ini dirancang bukan untuk membahas teknologi sebagai entitas 
            yang dingin dan terpisah, melainkan untuk menggali bagaimana kita dapat menanamkan nilai-nilai
            kemanusiaan—seperti empati, etika, dan kreativitas—ke dalam inti pengembangan AI. Kami akan
            mengupas tuntas visi masa depan di mana AI tidak menjadi pesaing, tetapi menjadi mitra kolaboratif yang memperkuat potensi unik manusia.
          </p>
        </div>
      </div>
    </div>
  );
}