import { Instagram, Facebook, MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-bg px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif mb-6 tracking-widest uppercase">Dianel Furs</h2>
            <p className="text-muted text-sm max-w-xs leading-relaxed font-light">
              Меховой дом из самого сердца Кавказа. 
              Собственное производство и готовые коллекции премиум-класса.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-accent mb-6">Контакты</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-center gap-3 text-muted">
                <MapPin size={14} className="text-accent" />
                г. Пятигорск, Черкесское шоссе, 22с2
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Mail size={14} className="text-accent" />
                <a href="mailto:dianel888@mail.ru" className="hover:text-white transition-colors">dianel888@mail.ru</a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone size={14} className="text-accent" />
                <a href="tel:+79280100208" className="hover:text-white transition-colors">+7 (928) 010-02-08</a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone size={14} className="text-accent" />
                <a href="tel:+79880922888" className="hover:text-white transition-colors">+7 (988) 092-28-88</a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock size={14} className="text-accent" />
                09:00 — 19:00 (Ежедневно)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-accent mb-6">Мы в соцсетях</h4>
            <div className="flex gap-6">
              <a href="https://t.me/dianel_furs" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                Telegram
              </a>
              <a href="https://vk.ru/dianel_furs" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                VK
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <div className="text-[10px] uppercase tracking-widest text-white/20">
            © 2026 Dianel Furs. All rights reserved.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
