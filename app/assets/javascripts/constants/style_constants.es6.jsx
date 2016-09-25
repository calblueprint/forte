(() => {
  class StyleConstants {

    get colors() {
      return {
        grey: '#5D5E5E',
        greyLight: '#BEBFBF',
        orange: '#E48E28',
        orangeLight: '#ECB067',
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

    get wrappers() {
      return {
        center: {
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
        },
        default: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        },
      };
    }
  }
  this.StyleConstants = new StyleConstants();
})();
