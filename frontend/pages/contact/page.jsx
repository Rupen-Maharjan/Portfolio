import { ContactInfo,ContactForm,ContactHeader} from '../../components/export';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-4 py-10">
      <main className="max-w-5xl mx-auto space-y-16">
        <ContactHeader />
        <ContactForm />
        <ContactInfo />

        <footer className="text-center pt-10 border-t border-gray-700">
          <h2 className="font-semibold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-4">
            Whether you need a website, web application, or mobile app, I'm here to help bring
            your vision to life.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Contact;