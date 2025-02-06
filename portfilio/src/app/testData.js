const catalogs = {
  tags: [{name: "people", thumbnail: "/Images/people1.jpg", description: "text"}, {name: "macro", thumbnail: "/Images/people1.jpg", description: "text"}, {name: "landscape", thumbnail: "/Images/people1.jpg",  description: "text"}],
  images: [
    {  
      id: 234,
      src: '/Images/people1.jpg', 
      thumbnail: '/Images/people1.jpg', 
      settings: { shutterSpeed: '1/4', aperture: 'f 16' },
      description: "some description", 
      alt: 'a boy eating a pineapple', 
      width: 4,
      height: 3,
      tags: ["people"]
    },
    {  
      id: 45,
      src: '/Images/people2.jpg', 
      thumbnail: '/Images/people2.jpg', 
      settings: { shutterSpeed: '1/4', aperture: 'f 16' },
      description: "some description",
      width: 4,
      height: 3,
      tags: ["people"]
    },
    {  
      src: '/Images/landscape4.jpg', 
      thumbnail: '/Images/landscape4.jpg', 
      settings: { shutterSpeed: '1/4', aperture: 'f 16' },
      width: 4,
      height: 3,
      tags: ["landscape"]
    },
    {  
      src: '/Images/landscape1.jpg', 
      settings: { shutterSpeed: '1/4', aperture: 'f 16' },
      tags: ["landscape", "macro", "food"]
    },
    {  
      src: '/Images/landscape2.jpg', 
      settings: { shutterSpeed: '1/4', aperture: 'f 16' },
      tags: ["landscape", "macro", "food"]
    },
    {  
      src: '/Images/landscape3.jpg', 
      settings: { shutterSpeed: '1/4', aperture: 'f 16' },
      tags: ["landscape", "macro", "food"]
    }
  ]
}

export default catalogs;
