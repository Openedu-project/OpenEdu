import CertificateImage from "@oe/assets/images/openedu-homepage/certificate.png";
import HienImage from "@oe/assets/images/openedu-homepage/testimonials/hien.png";
import TuongImage from "@oe/assets/images/openedu-homepage/testimonials/tuong.png";
import { Image } from "@oe/ui";
import { getTranslations } from "next-intl/server";

export async function LearningPathSection() {
  const t = await getTranslations("homePageLayout.learningPathSection");
  const TESTIMONIALS = [
    {
      id: 1,
      quote: t("testimonials.testimonials2.quote"),
      author: t("testimonials.testimonials2.author"),
      role: t("testimonials.testimonials2.role"),
      image: TuongImage,
    },
    {
      id: 2,
      quote: t("testimonials.testimonials3.quote"),
      author: t("testimonials.testimonials3.author"),
      role: t("testimonials.testimonials3.role"),
      image: HienImage,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-learning-gradient shadow-[0px_4px_10px_0px_#FFF_inset] backdrop-blur-lg">
      <div className="container relative z-10 mx-auto p-5 md:p-10">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4 md:mb-5">
            {t("title")}
          </h2>
          <p className="mcaption-regular16 lg:mcaption-regular24 mx-auto max-w-[85%]">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Certificate Section with responsive height */}
          <div className="flex flex-col">
            <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold28 mb-4 text-center md:mb-8">
              {t.rich("earnCertificate", {
                span: (chunks) => (
                  <span className="bg-gradient-to-br from-[#2CDEE9] via-[#7B5AFF] to-[#7B5AFF] bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h3>
            <div className="flex h-[300px] flex-1 items-center justify-center rounded-lg md:h-[500px] lg:h-full ">
              <Image
                src={CertificateImage.src}
                alt="Certificate of Completion"
                width={600}
                height={400}
                className="w-full object-contain"
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="flex flex-col lg:h-full">
            <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold28 mb-4 text-center md:mb-8">
              {t.rich("storyFromMembers", {
                span: (chunks) => (
                  <span className="bg-gradient-to-br from-[#2CDEE9] via-[#7B5AFF] to-[#7B5AFF] bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h3>
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-16 lg:gap-4">
              {TESTIMONIALS?.map((testimonial) => (
                <div
                  className="flex flex-col rounded-lg bg-white p-6 pt-12"
                  key={testimonial.id}
                >
                  <div className="flex h-[80px] w-full justify-center rounded-full bg-white p-0.5">
                    <Image
                      src={testimonial.image.src}
                      alt={testimonial.author}
                      width={80}
                      height={80}
                      className="h-[80px] w-[80px] min-w-[80px] rounded-full object-cover"
                    />
                  </div>
                  <div className="mt-2 mb-4 text-center">
                    <h4 className="mcaption-bold14 md:mcaption-bold16 mb-1">
                      {testimonial.author}
                    </h4>
                    <p className="mcaption-regular14 md:mcaption-regular16">
                      {testimonial.role}
                    </p>
                  </div>
                  <p className="mcaption-regular14 text-center">
                    {testimonial.quote}
                  </p>
                  <div className="mt-4 flex justify-center">
                    <span className="text-4xl text-indigo-600">❞</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
