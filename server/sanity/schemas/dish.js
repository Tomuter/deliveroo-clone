export default {
    name: 'dish',
    title: 'Dish',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Restaurant name',
        type: 'string',
        validation:(Rule)=>Rule.required(),
      },
      {
        name: 'short_description',
        title: 'Short description',
        type: 'string',
        validation:(Rule)=>Rule.max(200),
      },
      {
        name: 'image',
        title: 'Image of the Restaurant',
        type: 'image',
      },
      {
        name: 'price',
        title: 'Price of dish in GBP',
        type: 'number',
      },
      
      
      
    ],
  
  }
  