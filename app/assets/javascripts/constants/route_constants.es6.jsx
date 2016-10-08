(() => {
  class RouteConstants {

    get staticPages() {
      return {
        program: '/program',
        involvement: '/involvement',
        contact: '/contact',
      }
    }

    get adminPages() {
      return {
        matching: 'admin/matching',
        lessons: 'admin/lessons',
        roster: 'admin/roster',
      }
    }
  }
this.RouteConstants = new RouteConstants();
})();
