const catalogs = [
  {
    name: 'people',
    description: 'album description',
    images: [
      { 
        // id: 234,
        src: '/Images/people1.jpg', 
        // settings: { shutterSpeed: '1/4', aperture: 'f 16' },
        // description: "some description", 
        // alt: 'a boy eating a pineapple', 
        width: 4,
        height: 3
      },
      { 
        // id: 45,
        src: '/Images/people2.jpg', 
        // // settings: { shutterSpeed: '1/4', aperture: 'f 16' },
        // description: "some description",
        width: 4,
        height: 3
      },
      { 
        src: '/Images/landscape4.jpg', 
        // settings: { shutterSpeed: '1/4', aperture: 'f 16' },
        width: 4,
        height: 3
      }
    ],
    tumbnail: '/Images/people1.jpg',
  },
  {
    name: 'landscape',
    images: [
      { 
        src: '/Images/landscape1.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      },
      { 
        src: '/Images/landscape2.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      },
      { 
        src: '/Images/landscape3.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      }
    ]
  },
  {
    name: 'macro',
    images: [
      { 
        src: '/Images/landscape1.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      },
      { 
        src: '/Images/landscape2.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      },
      { 
        src: '/Images/landscape3.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      }
    ]
  },
  {
    name: 'food',
    images: [
      { 
        src: '/Images/landscape1.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      },
      { 
        src: '/Images/landscape2.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      },
      { 
        src: '/Images/landscape3.jpg', 
        settings: { shutterSpeed: '1/4', aperture: 'f 16' }
      }
    ]
  }
];

export default catalogs;
