"use client";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react"
// --------------------
// Reusable Components
// --------------------
function SectionHeader({
  category,
  title,
  subtitle,
}: {
  category?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      {category && (
        <GradientBorder className="via-slate-200/20 from-slate-200/20 w-fit">
          <div className="bg-secondary px-4 rounded-[inherit] py-2 text-center flex items-center justify-center">
            <span className="text-xs font-semibold">{category}</span>
          </div>
        </GradientBorder>
      )}
      <h1 className="text-5xl font-bold text-transparent leading-[64px] bg-clip-text bg-gradient-to-r from-slate-400 via-slate-300 to-foreground">
        {title}
      </h1>
      {subtitle && <p className="text-muted mt-1">{subtitle}</p>}
    </div>
  );
}

function InfoCard({
  title,
  content,
  padding = 20,
}: {
  title: string;
  content: string;
  padding?: number;
}) {
  return (
    <GradientBorder className="from-slate-200/35">
      <div
        style={{ padding: `${padding}px` }}
        className="bg-secondary rounded-[inherit]"
      >
        <span className="text-xs text-muted">Bilgi</span>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted text-sm">{content}</p>
      </div>
    </GradientBorder>
  );
}

function CellCanvas({
  modelUrl,
  cameraPos = [0, 5, 12],
}: {
  modelUrl: string;
  cameraPos?: [number, number, number];
  height?: string;
}) {
  return (
    <Canvas className={`!h-[70vh]`} camera={{ position: cameraPos, fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} />
      <CellModel url={modelUrl} />
      <OrbitControls />
    </Canvas>
  );
}

function ContributorTable({
  contributors,
}: {
  contributors: { name: string; role: string; heart: number }[];
}) {
  return (
    <div className="mt-16 max-w-full flex flex-col items-center gap-4">
      <h3 className="font-semibold text-foreground">Katkıda bulunanlar</h3>
      <div className="max-w-full overflow-x-auto">
      <GradientBorder className="from-slate-200/20 via-slate-200/15">
        <div className="rounded-[inherit] bg-accent">
          <table className="table-fixed">
            <thead>
              <tr className="text-left bg-secondary border-b border-b-slate-200/20">
                <th
                  className="p-3 font-medium rounded-tl-lg text-sm text-[#a1a1a1]"
                  scope="col"
                >
                  Ad ve soyad
                </th>
                <th
                  className="p-3 font-medium text-sm text-[#a1a1a1]"
                  scope="col"
                >
                  Görev
                </th>
                <th
                  className="p-3 font-medium text-sm text-[#a1a1a1]"
                  scope="col"
                >
                  <Icon icon={"solar:heart-outline"} />
                </th>
                <th
                  className="p-3 font-medium text-sm rounded-tr-lg text-[#a1a1a1]"
                  scope="col"
                >
                  Değerlendirme
                </th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((item, i) => (
                <tr
                  className={cn("text-left last:rounded-b-lg", {
                    "bg-popover": i % 2 == 0,
                  })}
                  key={i}
                >
                  <td className="p-3 text-sm text-foreground">{item.name}</td>
                  <td className="p-3 text-sm text-[foreground]">{item.role}</td>
                  <td className="p-3 text-sm text-[foreground]">
                    {item.heart}
                  </td>
                  <td className="p-3 flex items-center gap-2 text-sm">
                    <GradientBorder>
                      <div className="h-2 bg-accent rounded-full relative w-40">
                        <div
                          className="absolute rounded-[inherit] h-full bg-green-200"
                          style={{
                            width:
                              (item.heart / contributors.length) * 100 + "%",
                          }}
                        />
                      </div>
                    </GradientBorder>
                  
                    <span className="p-0.5 px-1.5 text-emerald-900 font-semibold text-xs rounded-full bg-green-200">
                      {((item.heart / contributors.length) * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GradientBorder>
        </div>
    </div>
  );
}

// --------------------
// Main Page
// --------------------
export default function Home() {
  const [cevaplar, setCevaplar] = useState({})
  const harfler = ["A", "B", "C", "D"];
  const fotosentez = [ { baslik: "Fotosentez nerede gerçekleşir?", icerik: "Fotosentez, bitki hücrelerinde bulunan kloroplast adlı yapılarda gerçekleşir. Kloroplastların içinde yeşil renkli klorofil maddesi bulunur. Bu madde, güneş ışığını yakalar ve bitkinin enerji üretmesini sağlar. Kloroplastlar özellikle yapraklarda çok fazladır çünkü yapraklar ışığı en iyi alan kısımdır.", }, { baslik: "Fotosentezin amacı nedir?", icerik: "Fotosentezin amacı, bitkinin kendi besinini üretmesidir. Bitki, güneş enerjisini kullanarak karbondioksit ve sudan şeker (glikoz) üretir. Ürettiği bu şekeri enerji kaynağı olarak kullanır. Ayrıca bu süreçte oksijen açığa çıkar ve havaya karışır.", }, { baslik: "Gerekli maddeler", icerik: "Fotosentez için bitkilerin üç şeye ihtiyacı vardır: su, karbondioksit ve güneş ışığı. Su, kökler aracılığıyla topraktan alınır. Karbondioksit, yapraklarda bulunan küçük deliklerden (stoma) girer. Güneş ışığı ise yaprağa vurduğunda klorofil tarafından emilir ve enerjiye dönüştürülür.", }, { baslik: "Işığa bağlı evre", icerik: "Bu evrede bitki, güneş ışığını kullanarak enerji üretir. Işık sayesinde su parçalanır ve oksijen ortaya çıkar. Aynı zamanda bitki, fotosentezin devamı için gerekli olan enerji taşıyıcı maddeleri üretir.", }, { baslik: "Işıktan bağımsız evre", icerik: "Bu evrede bitki, ışık olmadan da çalışabilir. Daha önce ışıkla üretilen enerji kullanılarak karbondioksit ve su, şeker (glikoz) haline getirilir. Yani burada bitki, aslında kendi besinini oluşturur.", }, { baslik: "Temel fotosentez denklemi", icerik: "Fotosentez şu şekilde özetlenir: Karbondioksit + Su + Güneş ışığı → Glikoz + Oksijen. Yani bitki havadan karbondioksit alır, kökten su çeker, ışığı kullanarak bunları glikoza ve oksijene dönüştürür.", }, { baslik: "Ortaya çıkan ürünler", icerik: "Fotosentez sonucunda iki önemli madde oluşur: glikoz ve oksijen. Glikoz, bitkinin enerjisini sağlar. Oksijen ise atmosfere karışır ve insanlar ile hayvanların solunum yapmasını sağlar.", }, { baslik: "Fotosentezin önemi", icerik: "Fotosentez dünyadaki yaşam için çok önemlidir. Çünkü bitkiler sayesinde hem besin hem de oksijen üretilir. Fotosentez olmasaydı insanlar ve hayvanlar yaşayamazdı. Ayrıca fotosentez, havadaki karbondioksiti azaltarak havayı temiz tutar.", }, { baslik: "Fotosentezi etkileyen faktörler", icerik: "Fotosentezin hızını ışık miktarı, sıcaklık, su ve karbondioksit miktarı etkiler. Işık ve karbondioksit artarsa fotosentez hızlanır, ama çok yüksek sıcaklık veya su eksikliği süreci yavaşlatır.", }, ];
  const handleClick = (index, secenek) => {
    if (cevaplar[index]) return; // aynı soruya ikinci tıklamayı engelle
    setCevaplar((prev) => ({ ...prev, [index]: secenek }));
  };
  const contributors = [
    { name: "Yunus Emre GÜN", role: "Modelin oluşturulması", heart: 5 },
    {
      name: "Erkan SEVEN",
      role: "Fotosentezin aşamaları ile ilgili araştırmalar",
      heart: 5,
    },
    {
      name: "Yüksel ÜNGÜN",
      role: "Fotosentezin aşamaları ile ilgili araştırmalar",
      heart: 5,
    },
    {
      name: "Devrim ATİK",
      role: "Hücre modelinin taslak çizimi (kağıt)",
      heart: 6,
    },
    { name: "Kerem GÜNDOĞAN", role: "Websitenin oluşturulması", heart: 6 },
    { name: "Metehan SARIÇALI", role: "Proje Yöneticisi", heart: 5 },
  ];
  const sorular = [
    {
      soru: "Fotosentez hangi hücre yapısında gerçekleşir?",
      secenekler: ["Mitokondri", "Kloroplast", "Ribozom", "Çekirdek"],
      cevap: "Kloroplast",
    },
    {
      soru: "Fotosentez sırasında hangi gaz kullanılır?",
      secenekler: ["Oksijen", "Karbondioksit", "Azot", "Helyum"],
      cevap: "Karbondioksit",
    },
    {
      soru: "Fotosentez sonucunda hangi madde açığa çıkar?",
      secenekler: ["Su", "Protein", "Oksijen", "Karbondioksit"],
      cevap: "Oksijen",
    },
    {
      soru: "Fotosentezin temel amacı nedir?",
      secenekler: [
        "Bitkinin oksijen üretmesi",
        "Bitkinin enerji (besin) üretmesi",
        "Su depolamak",
        "Toprakta kökleri güçlendirmek",
      ],
      cevap: "Bitkinin enerji (besin) üretmesi",
    },
    {
      soru: "Işığa bağlı tepkimelerde hangi olay gerçekleşir?",
      secenekler: [
        "Glikoz sentezi",
        "Su parçalanması ve oksijenin açığa çıkması",
        "Karbondioksit kullanımı",
        "ATP’nin harcanması",
      ],
      cevap: "Su parçalanması ve oksijenin açığa çıkması",
    },
    {
      soru: "Fotosentez için gerekli üç temel madde hangileridir?",
      secenekler: [
        "Su, karbondioksit, ışık",
        "Oksijen, su, azot",
        "Su, glikoz, ışık",
        "Mineral, su, oksijen",
      ],
      cevap: "Su, karbondioksit, ışık",
    },
    {
      soru: "Işıktan bağımsız evrede ne üretilir?",
      secenekler: ["Oksijen", "Su", "Glikoz", "ATP"],
      cevap: "Glikoz",
    },
    {
      soru: "Fotosentez olmasaydı dünyada ne olurdu?",
      secenekler: [
        "Oksijen miktarı artardı",
        "Canlılar besin bulamazdı",
        "Bitkiler daha hızlı büyürdü",
        "Karbondioksit azalırdı",
      ],
      cevap: "Canlılar besin bulamazdı",
    },
  ];
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex flex-col gap-6 items-center justify-center my-32 px-6">
        <div className="fixed top-0 pointer-events-none left-0 w-full h-64 bg-white/15 blur-[500px]" />
        <div className="fixed bottom-0 pointer-events-none left-0 w-full h-64 bg-white/15 blur-[500px]" />
        <SectionHeader
          category="Biyoloji"
          title="Fotosentezin genel aşamaları"
          subtitle="Merhaba, fotosentezin genel aşamalarını 3D model şeklinde size sunacağız."
        />
        <span className="text-indigo-200 font-semibold">Hemen aşağı in</span>
        <ContributorTable contributors={contributors} />
      </section>
<section className="relative z-[12]">
      {/* Plant Cell Model */}
      <section className="px-6 flex flex-col text-center items-center mb-12">
        <SectionHeader
          category="Öğrenim 1"
          title="Bir bitki hücresinin modeli"
        />
        <CellCanvas modelUrl="/models/plant-cell.glb" />
      </section>

      {/* Photosynthesis Process */}
      <section className="px-6 flex flex-col text-center items-center mb-12">
        <SectionHeader
          category="Öğrenim 2"
          title="Fotosentezin gerçekleşmesi"
          subtitle="Fotosentez, kloroplastın içinde gerçekleşir. Kloroplastın içinde aşağıdaki formül gerçekleşir."
        />
        <div className="italic mt-4">
          <span>Formül = </span>
          <span>Karbondioksit + Su</span>
          <span className="mx-2">↪</span>
          <span>Glikoz + Oksijen</span>
        </div>
        <CellCanvas modelUrl="/models/main-model.glb" cameraPos={[0, 10, 0]} />
        <div className="mt-12 flex flex-wrap gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-yellow-200 rounded-[1rem]" />
            <span>Co₂</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-b from-emerald-200 to-indigo-200 rounded-[1rem]" />
            <span>H₂O</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-10 bg-indigo-500/80 rounded-[1rem]" />
            <span>C₆H₁₂O₆ (Glikoz)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-10 bg-purple-100 rounded-[1rem]" />
            <span>O₂</span>
          </div>
        </div>
      </section>

      {/* Photosynthesis Info */}
      <section className="grid grid-col lg:grid-cols-2 mb-12 gap-4 px-6">
        <div className="flex flex-col gap-4">
          {fotosentez.slice(0, 4).map((item, i) => (
            <InfoCard
              padding={24}
              key={i}
              title={item.baslik}
              content={item.icerik}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {fotosentez.slice(4, 8).map((item, i) => (
            <InfoCard key={i} title={item.baslik} content={item.icerik} />
          ))}
        </div>
      </section>
  {/* Quiz Section */}
  <section className="px-6 flex flex-col items-center mb-16">
      <SectionHeader
        category="Test Zamanı"
        title="Fotosentez Bilgini Ölç!"
        subtitle="Aşağıdaki sorulara tıkla ve bilgini test et!"
      />

      <div className="mt-8 grid gap-6 max-w-2xl w-full">
        {sorular.map((soru, i) => (
          <GradientBorder key={i} className="from-slate-200/35">
            <div className="bg-secondary rounded-[inherit] p-4 text-left">
              <h3 className="font-semibold text-foreground mb-3">
                {i + 1}. {soru.soru}
              </h3>

              <ul className="space-y-2">
                {soru.secenekler.map((secenek, j) => {
                  const secilen = cevaplar[i];
                  const dogru = secenek === soru.cevap;

                  // Renk durumları
                  let renk = "bg-muted hover:bg-muted/60";
                  if (secilen) {
                    if (secilen === secenek && dogru) renk = "bg-green-500/80 text-white";
                    else if (secilen === secenek && !dogru) renk = "bg-red-500/80 text-white";
                    else if (dogru) renk = "bg-green-500/20";
                  }

                  return (
                    <li
                      key={j}
                      onClick={() => handleClick(i, secenek)}
                      className={`cursor-pointer rounded-md px-3 py-2 transition ${renk}`}
                    >
                      <span className="font-semibold mr-2">{harfler[j]}.</span>
                      {secenek}
                    </li>
                  );
                })}
              </ul>
            </div>
          </GradientBorder>
        ))}
      </div>
    </section>
      {/* Footer */}
      <section className="flex flex-col items-center mb-12 px-6">
        <SectionHeader
          category="Bitiş"
          title="Proje bitti."
          subtitle="Projenin sonuna ulaşmış bulunmaktayız. Emeği geçen herkese teşekkürlerimi sunuyorum."
        />
      </section>
</section>
    </main>
  );
}

// --------------------
// Cell Model
// --------------------
export function CellModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  scene.scale.set(50, 50, 50);
  scene.rotation.y = -Math.PI / 2;
  return <primitive object={scene} />;
}
