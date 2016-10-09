(() => {
  class RouteConstants {

    get staticPages() {
      return {
        program: '/program',
        involvement: '/involvement',
        contact: '/contact',
      }
    }

    get authentication() {
      return {
        login:
        {
          student: '/students/sign_in',
          teacher: '/teachers/sign_in',
        },
        logout:
        {
          student: '/students/sign_out',
          teacher: '/teachers/sign_out',
        }
      }
    }
  }
this.RouteConstants = new RouteConstants();
})();
