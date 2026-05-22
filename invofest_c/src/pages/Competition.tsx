import { Button } from "../components/Button";

export default function Competition() {
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
              IT Competition
            </h1>
            <p
              data-aos="fade-right"
              data-aos-delay="400"
              className="text-[#7A1E3A] text-lg sm:text-xl font-medium"
            >
              “From Creation to Innovation”
            </p>
          </div>

          <p className="text-gray-800 leading-relaxed">
            Kompetisi dalam INVOFEST ini mengusung tema <strong>“From Creation to Innovation”</strong>. 
            Tema ini bertujuan mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna 
            membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan.
          </p>

          <div className="flex gap-3">
            <a href="/login">
              <Button label="Daftar Sekarang" variant="primary" />
            </a>
          </div>
        </div>
        
        <div className="w-1/3">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png"
            alt="Maskot Lomba"
          />
        </div>
      </section>

      <div
        id="description"
        className="bg-[#fce7f3] py-24 px-4 mt-10 text-center"
        style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl  text-[#801b3f] mb-8 uppercase tracking-wide">
            Deskripsi Kompetisi
          </h2>
          <p className="text-gray-700 max-w-5xl mx-auto leading-loose text-lg">
            Kompetisi atau perlombaan yang ada dalam kegiatan <strong>INVOFEST (Informatics Vocational Festival) 2025</strong> adalah diantaranya 
            National Poster Design Competition, UI UX Design Competition, dan juga Web Development Competition. 
            Kompetisi dalam INVOFEST ini mengusung tema <strong>“From Creation to Innovation”</strong>. Tema ini bertujuan mengajak generasi muda untuk 
            mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu 
            mewujudkan masa depan yang berkelanjutan. Melalui pendekatan ini, diharapkan generasi ini akan berperan dalam 
            menciptakan solusi-solusi baru untuk tantangan masa kini dan mendatang, baik dalam hal teknologi, lingkungan, pendidikan, 
            maupun tanggung jawab sosial.
          </p>
        </div>
      </div>
    </div>
  );
}