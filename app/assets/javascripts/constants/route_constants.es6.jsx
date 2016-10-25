(() => {
  class RouteConstants {

    get staticPages() {
      return {
        program: '/program',
        involvement: '/involvement',
        contact: '/contact',
        about: '/about',
      }
    }

    get authentication() {
      return {
        login:
        {
          student: '/students/sign_in',
          teacher: '/teachers/sign_in',
          admin: '/admins/sign_in',
        },
        logout:
        {
          student: '/students/sign_out',
          teacher: '/teachers/sign_out',
          admin: '/admins/sign_out',
        },
        signup:
        {
          student: '/students',
        }
      }
    }

    get admin() {
      return {
        matched: '/admin/matched',
        unmatched: '/admin/unmatched',
        lessons: '/admin/lessons',
        roster: '/admin/roster',
      }
    }
  }
this.RouteConstants = new RouteConstants();
})();
