(() => {
  class RouteConstants {

    get staticPages() {
      return {
        home: '/',
        program: '/program',
        involvement: '/involvement',
        contact: '/contact',
        about: '/about',
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

    get student() {
      return {
        dashboard: '/student/dashboard',
        lessons: '/student/lessons',
        profile: '/student/profile',
        settings: '/student/settings',
      }
    }

    get form() {
      return {
        student: '/form/student',
        teacher: '/form/teacher',
      }
    }
  }
this.RouteConstants = new RouteConstants();
})();
