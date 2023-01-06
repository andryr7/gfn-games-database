export const sortGameData = (array, sortingtype) => {
  switch (sortingtype) {
    case 'name-asc':
      return array.sort((a,b)=>{
        if (a.name < b.name) {
          return -1;
        }
        else {
            return 1;
        }
      });
    case 'name-desc':
      return array.sort((a,b)=>{
        if (a.name > b.name) {
          return -1;
        }
        else {
            return 1;
        }
      });
    case 'gamersrating-asc':
      return array.sort((a,b)=>{
        // items cannot be compared
        if (!a.IGDBdata || !a.IGDBdata.rating) {
          return 1;
        };
        if (!b.IGDBdata || !b.IGDBdata.rating) {
          return -1;
        };
        if (a.IGDBdata.rating > b.IGDBdata.rating) {
          return -1;
        };
        if (a.IGDBdata.rating < b.IGDBdata.rating) {
          return 1;
        };
      });
    case 'gamersrating-desc':
      return array.sort((a,b)=>{
        // items cannot be compared
        if (!a.IGDBdata || !a.IGDBdata.rating) {
          return 1;
        };
        if (!b.IGDBdata || !b.IGDBdata.rating) {
          return -1;
        };
        if (a.IGDBdata.rating < b.IGDBdata.rating) {
          return -1;
        };
        if (a.IGDBdata.rating > b.IGDBdata.rating) {
          return 1;
        };
      });
    case 'criticsrating-asc':
      return array.sort((a,b)=>{
        // items cannot be compared
        if (!a.IGDBdata || !a.IGDBdata.aggregated_rating) {
          return 1;
        };
        if (!b.IGDBdata || !b.IGDBdata.aggregated_rating) {
          return -1;
        };
        if (a.IGDBdata.aggregated_rating > b.IGDBdata.aggregated_rating) {
          return -1;
        };
        if (a.IGDBdata.aggregated_rating < b.IGDBdata.aggregated_rating) {
          return 1;
        };
      });
    case 'criticsrating-desc':
      return array.sort((a,b)=>{
        // items cannot be compared
        if (!a.IGDBdata || !a.IGDBdata.aggregated_rating) {
          return 1;
        };
        if (!b.IGDBdata || !b.IGDBdata.aggregated_rating) {
          return -1;
        };
        if (a.IGDBdata.aggregated_rating < b.IGDBdata.aggregated_rating) {
          return -1;
        };
        if (a.IGDBdata.aggregated_rating > b.IGDBdata.aggregated_rating) {
          return 1;
        };
      });
  }
}