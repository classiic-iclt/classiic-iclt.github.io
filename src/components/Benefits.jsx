import { benefits,getSpreadsheetData } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import Button from "./Button";
import React, { useState, useEffect } from "react";
const Benefits = () => {
  const [updatedBenefits, setUpdatedBenefits] = useState(benefits);

  useEffect(() => {
      const updateBenefitsData = async () => {
          const spreadsheetData = await getSpreadsheetData(); // Memanggil fungsi ambil data

          const updatedData = benefits.map((item) => {
              // Mengecualikan item dengan ID 6, 7, dan 8
              if (["6", "7", "8"].includes(item.id)) {
                  return item; // Jika ID-nya 6, 7, atau 8, data tidak diubah
              }

              const spreadsheetItem = spreadsheetData.find(
                  (entry) => entry.id === item.id
              );

              if (spreadsheetItem) {
                  return {
                      ...item,
                      title: spreadsheetItem.title,
                      slot: spreadsheetItem.slot,
                  };
              }

              return item;
          });

          setUpdatedBenefits(updatedData); // Set hasil update ke state
      };

      updateBenefitsData();
  }, []);
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Daftar Lomba"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <p className="body-2 mb-6 text-n-3">Jenjang: {item.jenjang}</p>
                <p className="body-2 mb-6 text-n-3">Biaya Pendaftaran: {item.biayaPendaftaran}</p>
                <p className="body-2 mb-6 text-n-3">Jenis: {item.jenis}</p>
                <div className="flex items-center mt-auto">
                <p className=" font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                  <Button  white >
            {item.type}
          </Button>
                    
                  </p>
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                  <Button  >
                    
            Sisa Slot: {item.slot}
          </Button>
                    
                  </p>
                  
               
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
