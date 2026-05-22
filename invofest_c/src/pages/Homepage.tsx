import Button from "../components/Button";
import Collapse from "../components/Collapse";

export default function Homepage(){
   const cardItems = [
    {
      title: "IT Seminar",
      description: 
      "Seminar nasional ini membahas 'Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif' untuk mengembangkan potensi diri dan pengetahuan teknologi lebih dalam lagi.",
    },
    {
      title: "IT Talkshow",
      description: "Talkshow 'Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan' membahas peran manusia dalam memanfaatkan AI untuk solusi berkelanjutan dan peningkatan teknologi.",
    },
    {
      title: "IT Competition",
      description: "Kompetisi 'From Creation to Innovation' mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan.",
    },
    {
      title: "IT Workshop",
      description: "Workshop 'AI for a Sustainable Future: The Role of Z Generation in the Digital Era' membekali Gen Z dengan keterampilan praktis AI untuk menciptakan solusi berkelanjutan.",
    },
  ];
  const collapseItems = [
    {
      title: "Apa itu Invofest?",
      description: "Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital. Dengan mengusung tema 'Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow'.",
    },
    {
      title: "Kapan dan di mana Invofest akan diselenggarakan?",
      description: "Invofest akan diselenggarakan pada tanggal 15-17 November 2024 di Jakarta Convention Center (JCC), Jakarta, Indonesia.",
    },
    {
      title: "Siapa saja yang dapat mengikuti Invofest?",
      description: "Invofest terbuka untuk semua kalangan, terutama mahasiswa, pelajar, profesional muda, dan siapa saja yang tertarik dengan teknologi dan inovasi.",
    },
    {
      title : " Bagaimana saya mengetahui pemenang kompetisi?",
      description: "Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri"
    }
  ];


    return (
        <div>
            <section 
                      id="hero" 
                      className="max-w-7xl mx-auto py-10 flex gap-10 justify-between items-center px-4" 
                    > 
                      <div className="w-2/3 flex flex-col gap-6"> 
                        <img 
                          src="https://www.invofest-harkatnegeri.com/assets/text-image.png" 
                          alt="" 
                          className="w-96" 
                        /> 
                        <p className="text-gray-700"> 
                          Invofest (Informatics Vocational Festival) adalah festival tahunan 
                          yang bertujuan untuk menginspirasi dan memberdayakan generasi muda 
                          Indonesia dalam menghadapi era digital. Dengan mengusung tema 
                          <strong>"Beyond Limits, Beyond Intelligence: Innovate for a Smarter 
                          Tomorrow". </strong>
                          
                        </p>
                        <div className="flex gap-3"> 
                          <Button label="INFO SELENGKAPNYA" variant="primary" /> 
                          <Button label="HUBUNGI PANITIA" variant="outline" /> 
                        </div> 
                      </div> 
                      <div className="w-1/3"> 
                        <img 
                          src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png" 
                          alt="" 
                        /> 
                      </div> 
                    </section> 
                    
                           {/* tEntang invofest */}
        <div id="about" className="bg-[#fce7f3] py-24 px-4 mt-10" style={{ clipPath: 'ellipse(150% 100% at 50% 100%)' }}>
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-[#801b3f] mb-4">Tentang INVOFEST</h2>
              <p className="text-gray-800 max-w-5xl leading-relaxed">
                Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik Informatika Universitas Harkat Negeri, 
                adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia 
                dalam menghadapi era digital. Dengan mengusung tema <strong>"Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow"</strong>. 
                Invofest 2025 menghadirkan berbagai kegiatan menarik seperti kompetisi IT, workshop IT, dan seminar nasional & talkshow dengan para ahli teknologi.
              </p>
            </div>

            {/* grid kartu  */}
            <section id="cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col h-full bg-white border-2 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                > 
                  <h3 className="text-2xl font bold text-red-900 mb-4">{item.title}</h3>
                  <p>{item.description}</p>
                  <Button 
                    label="Info Selengkapnya" 
                    variant="primary" 
                    className="mt-4" 
                  />
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* faq */}
        <section id="faq" className="max-w-7xl mx-auto py-24 flex flex-col gap-2 px-3">
          <h2 className="text-3xl  text-[#801b3f] mb-6 text-center">FAQ</h2>
          {collapseItems.map((item, index) => (
            <Collapse 
              key={index} 
              title={item.title} 
              description={item.description} 
            />
          ))}
        </section>
   
    </div>
  );
}

