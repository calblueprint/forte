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

    get heights() {
      return {
        header: '50px',
        footer: '80px',
      };
    }

    get widths() {
      return {
        sidebar: '172px',
      };
    }

    get pages() {
      return {
        wrapper: {
          display: 'flex',  
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: this.heights.header,
        },
        content: {
          flex: 1,
          maxWidth: '900px',
        },
      };
    }
  }
  this.StyleConstants = new StyleConstants();
})();
