import React from 'react';

const About: React.FC = () => {
  return (
    <>
      <section id="about" className="py-13 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="max-w-3xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-sm border">
              <h2 className="text-center text-3xl font-bold text-[#0F828C] mb-8">Tentang PRIMMLEARN</h2>
              <p className="text-gray-600 leading-relaxed text-justify text-lg text-balance">
                <strong>PRIMMLEARN</strong> hadir sebagai solusi inovatif dalam pendidikan teknologi, khususnya sebagai platform <em>Learning Management System</em> (LMS) yang dirancang untuk menjembatani pemahaman logika pemrograman pada siswa dengan menggunakan pendekatan PRIMM (Predict-Run-Investigate-Modify-Make).
                <br /><br />
                Melalui metode ini, siswa diajak untuk aktif bereksplorasi; mulai dari memprediksi program hingga akhirnya mampu mengonstruksi solusi program secara mandiri dan kreatif. <strong>PRIMMLEARN</strong> berkomitmen untuk menciptakan pengalaman belajar yang interaktif serta memastikan setiap konsep dasar pemrograman dapat dikuasai secara mendalam dan fundamental.
              </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
