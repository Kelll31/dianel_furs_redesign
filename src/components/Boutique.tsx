import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import Footer from "./Footer";

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function Boutique() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = () => {
      if (!mapRef.current || !window.ymaps || !isMounted) return;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [44.066669, 42.984791], // Пятигорск, новое местоположение
          zoom: 17,
          controls: []
        });

        // Отключаем скролл зум для лучшего UX
        map.behaviors.disable('scrollZoom');

        // Создаем кастомную метку с золотым кругом
        const CustomPin = window.ymaps.templateLayoutFactory.createClass(
          `<div class="yandex-custom-pin"></div><div class="yandex-custom-pin-label">Dianel Furs</div>`
        );

        const placemark = new window.ymaps.Placemark([44.066669, 42.984791], {
          hintContent: 'Dianel Furs',
          balloonContent: '<strong>Dianel Furs</strong><br>Черкесское шоссе, 22с2, село Винсады, Предгорный муниципальный округ, Ставропольский край'
        }, {
          iconLayout: CustomPin,
          iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 12
          }
        });

        map.geoObjects.add(placemark);
      });
    };

    // Загружаем скрипт Яндекс.Карт, если он еще не загружен
    if (window.ymaps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=c18dae1d-c4d3-4e89-9e8c-55dcbfebc023&lang=ru_RU';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      // Очистка при размонтировании
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="pt-32">
      {/* CSS стили для кастомной золотой метки на карте */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pulse-pin-gold {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 rgba(212, 175, 55, 0); }
        }
        .yandex-custom-pin {
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: #d4af37;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-pin-gold 2s infinite;
          border: 3px solid white;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .yandex-custom-pin:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }
        .yandex-custom-pin-label {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12px;
          color: #d4af37;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .yandex-custom-pin-label::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px 6px 0;
          border-style: solid;
          border-color: #1a1a1a transparent transparent transparent;
        }
      `}} />

      <section className="px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">
                Наш <br /> <span className="italic">Бутик</span>
              </h1>
              <div className="space-y-8 text-muted font-light leading-relaxed">
                <p className="text-lg">
                  Наш бутик — это место, 
                  где встречаются традиции и современная роскошь.
                </p>
                <p>
                  Мы создали пространство, где каждый гость может почувствовать себя 
                  особенным. Интерьер бутика выполнен в стиле современного минимализма 
                  с использованием натуральных материалов, что подчеркивает красоту 
                  наших изделий.
                </p>
                <div className="pt-8">
                  <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Location</div>
                  <p className="text-white">г. Пятигорск, Черкесское шоссе, 22с2</p>
                  <p className="text-white mt-2">dianel888@mail.ru</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="aspect-[3/4] bg-white/5 overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop"
                  alt="Interior 1"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="aspect-[3/4] bg-white/5 overflow-hidden mt-12"
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                  alt="Interior 2"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold">Visit Us</span>
              <h2 className="text-4xl md:text-6xl font-serif">
                Как нас <span className="italic text-accent">найти</span>
              </h2>
            </div>
            <div className="text-muted font-light text-sm max-w-sm">
              <p>Мы всегда рады видеть вас в нашем бутике. Запланируйте визит, чтобы примерить эксклюзивные изделия.</p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/10 relative bg-white/5"
          >
            <div ref={mapRef} className="w-full h-full" />
            {/* Map Overlay Decoration */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[3rem]" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
