import { QuoteRight } from "@oe/assets";
import HienImage from "@oe/assets/images/openedu-homepage/testimonials/hien.png";
import TungImage from "@oe/assets/images/openedu-homepage/testimonials/tung.png";
import TuongImage from "@oe/assets/images/openedu-homepage/testimonials/tuong.png";
import { Image } from "@oe/ui";
import { Star, StarHalf } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const Stars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <>
      {[...new Array(fullStars)].map((_, i) => (
        <Star
          key={`star-${i}-${Math.random()}`}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...new Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-star-${i}-${Math.random()}`}
          className="h-5 w-5 text-yellow-400"
        />
      ))}
    </>
  );
};

export function TestimonialsSection() {
  const t = useTranslations("homePageLayout.testimonialsSection");
  const TESTIMONIALS = useMemo(
    () => [
      {
        id: 1,
        quote: t("testimonials.testimonials1.quote"),
        author: t("testimonials.testimonials1.author"),
        role: t("testimonials.testimonials1.role"),
        rating: 4.5,
        image: TungImage,
      },
      {
        id: 2,
        quote: t("testimonials.testimonials2.quote"),
        author: t("testimonials.testimonials2.author"),
        role: t("testimonials.testimonials2.role"),
        rating: 4.5,
        image: TuongImage,
      },
      {
        id: 3,
        quote: t("testimonials.testimonials3.quote"),
        author: t("testimonials.testimonials3.author"),
        role: t("testimonials.testimonials3.role"),
        rating: 4.5,
        image: HienImage,
      },
    ],
    [t]
  );

  return (
    <div className="w-full bg-white py-6 lg:py-10">
      <div className="container mx-auto px-0 md:px-4">
        <div className="mb-3 text-center md:mb-6">
          <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4">
            {t("title")}
          </h2>
          <p className="mcaption-regular16 lg:mcaption-regular24">
            {t("description")}
          </p>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={testimonial.id} className="relative pt-8 pb-16">
              {/* Quote Box */}
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 pb-16 shadow-[0px_4px_30px_0px_#F4F5F6]">
                <div className="mb-6 flex justify-center">
                  <QuoteRight className="h-8 w-8 text-primary md:h-12 md:w-12" />
                </div>
                <div className="flex flex-grow flex-col">
                  <p className="mcaption-regular14 mb-6 text-center">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="mt-auto flex justify-center">
                  <Stars rating={testimonial.rating} />
                </div>
              </div>
              {/* Author Box - Positioned to overlap */}
              <div
                className={`-translate-x-1/2 -bottom-[46px] md:-bottom-[48px] lg:-bottom-[62px] xl:-bottom-[38px] absolute left-1/2 ${
                  index === 1 ? "lg:-bottom-[56px] xl:!-bottom-[56px]" : ""
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-[80px] w-[80px] rounded-[9999px] bg-white p-0.5">
                    <Image
                      src={testimonial.image.src}
                      alt={testimonial.author}
                      width={80}
                      height={80}
                      className="h-full w-full rounded-[9999px] object-cover"
                    />
                  </div>
                  <div className="mt-1 lg:mt-4">
                    <h4 className="giant-iheading-bold16 mb-1">
                      {testimonial.author}
                    </h4>
                    <p className="mcaption-regular14">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
