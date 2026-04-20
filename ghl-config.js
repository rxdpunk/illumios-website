window.ILLUMIOS_GHL = Object.assign(
  {
    // GitHub Pages posts lead capture to the Vercel backend so the public site
    // can use the server-side GHL REST API flow without exposing a public GHL
    // webhook URL.
    applyEndpoint: 'https://illumios-website.vercel.app/api/apply',
    locationId: 'OZuyOTAOTmf8eXnn8n0G',
    offerSlug: 'illumios-academia'
  },
  window.ILLUMIOS_GHL || {}
);
