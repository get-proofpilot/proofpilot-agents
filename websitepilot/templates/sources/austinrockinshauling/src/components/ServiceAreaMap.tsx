import React from 'react';

const ServiceAreaMap = () => {
  return (
    <div className="bg-background shadow-2xl overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d853216.9581417657!2d-111.81270054999999!3d33.34811755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa8c49eee2aca0c9b%3A0xea77048c947696c4!2sRocking%20S%20Hauling!5e0!3m2!1sen!2sus!4v1775882733732!5m2!1sen!2sus"
        className="w-full h-[450px] lg:h-[550px]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Rocking S Hauling Service Area Map"
      />
    </div>
  );
};

export default ServiceAreaMap;
