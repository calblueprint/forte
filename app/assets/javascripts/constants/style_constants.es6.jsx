(() => {
  class StyleConstants {

    get colors() {
      return {
        grey: '#5D5D5D',
        greyLight:'#5D5D5D',
        orange: '#E48E1E',
        orangeLight: '#E48E1E',
        white: '#FFFFFF',
      };
    }

    get fonts() {
      return {
        sizes: {
          largest: '36px',
          larger: '30px',
          large: '24px',
          medium: '18px',
          small: '16px',
          smaller: '14px',
          smallest: '12px',
        },
      };
    }
  }
  this.StyleConstants = new StyleConstants();
})();